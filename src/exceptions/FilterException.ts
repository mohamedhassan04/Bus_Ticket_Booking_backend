import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException, ForbiddenException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(
    exception: UnauthorizedException | ForbiddenException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let message = 'Access denied';
    if (exception instanceof UnauthorizedException) {
      message = 'Authentication required';
    } else if (exception instanceof ForbiddenException) {
      message = 'Insufficient permissions';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.message || 'Unauthorized',
    });
  }
}
