// create a new file named error.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus ? exception.getStatus() : 500;

    this.logger.error(`[${request.method}] ${request.url}`, exception.stack);

    response.status(status).json({
      statusCode: status,
      message: 'Internal server error',
    });
  }
}
