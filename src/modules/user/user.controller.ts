import {
  Controller,
  Get,
  Body,
  HttpStatus,
  Param,
  UseGuards,
  Delete,
  Patch,
  Query,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@Method GET
  //@desc Get one user by email
  //@Path: /getUser
  @ApiOperation({ summary: 'Get One User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Get One User.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get One User.',
  })
  @Get('getUser')
  findOne(@Body() email: string) {
    return this.userService.findOneUser(email);
  }

  //@Method GET
  //@desc Get one user by email
  //@Path: /getUser
  @ApiOperation({ summary: 'Get One User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Get One User.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get One User.',
  })
  @Get('users')
  findAll() {
    return this.userService.findAll();
  }

  //@Method GET
  //@desc Get one user by email
  //@Path: /getUser
  @ApiOperation({ summary: 'Get One User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Get One User.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get One User.',
  })
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  //@Method GET
  //@desc Get one user by email
  //@Path: /getUser
  @ApiOperation({ summary: 'Get One User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Get One User.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Get One User.',
  })
  @ApiCookieAuth('token')
  @UseGuards(JwtAuthGuard)
  @Get('getUser/:id')
  findOneUserById(@Param('id') id: string) {
    return this.userService.findOneUserById(id);
  }

  //@Method PATCH
  //@desc Confirm account
  //@Path: /confirm-account
  @ApiOperation({ summary: 'Confirm Account' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Confirm Account.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Confirm Account.',
  })
  @Patch('confirm-account')
  async confirmAccount(@Query('token') token: string) {
    return await this.userService.confirmAccount(token);
  }

  //@Method POST
  //@desc Send email reset password
  //@Path: /send-reset
  @ApiOperation({ summary: 'Send Email Reset Password' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful send email.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error send email.',
  })
  @Post('send-reset')
  async sendEmailResetPassword(@Body('email') email: string) {
    return await this.userService.sendEmailResetPassword(email);
  }

  //@Method POST
  //@desc Reset password
  //@Path: /reset-password
  @ApiOperation({ summary: 'Reset Password' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful Reset Password.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error Reset Password.',
  })
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    return this.userService.resetPassword(body.token, body.newPassword);
  }
}
