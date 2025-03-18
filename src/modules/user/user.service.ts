import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/shared/send-mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepo: Repository<User>,
    private readonly emailService: EmailService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    try {
      const user = this._userRepo.create(createUserDto);

      // Check if email already exists
      const existingUser = await this._userRepo.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt();
      const passwordHash = createUserDto.password;
      const hash = await bcrypt.hash(passwordHash, salt);

      // Save user
      hash && (user.password = hash);

      user.confirmationToken = uuidv4();
      await this._userRepo.save(user);

      const confirmationLink = `${process.env.FRONTEND_PATH}confirm-account?token=${user.confirmationToken}`;
      // Send confirmation email
      await this.emailService.sendEmailConfirmAccount(
        user.email,
        confirmationLink,
      );

      //For not return the password in the response
      const { password, ...result } = user;
      return {
        message: 'User registered successfully',
        HttpStatus: HttpStatus.CREATED,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOneUser(email: string) {
    return await this._userRepo.findOne({
      where: { email: email },
    });
  }

  async findAll() {
    const users = await this._userRepo.find();
    const result = users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
    return { success: result, status: HttpStatus.OK };
  }

  async deleteUser(id: string) {
    return await this._userRepo.delete(id);
  }

  async findOneUserById(id: string) {
    return await this._userRepo.findOne({
      where: { id: id },
    });
  }

  async confirmAccount(token: string) {
    const user = await this._userRepo.findOne({
      where: { confirmationToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.isConfirmed = true;
    user.confirmationToken = null;
    await this._userRepo.save(user);

    return { message: 'Account confirmed successfully' };
  }

  async sendEmailResetPassword(email: string) {
    const user = await this._userRepo.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.resetPwdToken = uuidv4();
    await this._userRepo.save(user);
    const resetLink = `${process.env.FRONTEND_PATH}reset-password?token=${user.resetPwdToken}`;
    await this.emailService.sendEmailResetPassword(user.email, resetLink);

    return { message: 'Email sent successfully' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this._userRepo.findOne({
      where: { resetPwdToken: token },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPwdToken = null;
    await this._userRepo.save(user);

    return { message: 'Password reset successfully' };
  }
}
