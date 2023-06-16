import { Request, Response } from 'express';
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);

    const responseMessage =
      exception instanceof NotFoundException
        ? exception.message
        : 'Erro desconhecido';

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    response.status(status).json({
      message: exception?.response?.message || responseMessage,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
