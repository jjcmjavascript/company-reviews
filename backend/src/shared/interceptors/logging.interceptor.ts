import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

const getJsonString = (data: unknown): string => {
  try {
    if (typeof data === 'string') {
      return data;
    }

    if (typeof data === 'object') {
      return JSON.stringify(data) || '----';
    }

    return String(data);
  } catch (error) {
    return 'Error converting to JSON';
  }
};

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();

    this.logger.log(` 🚀 ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap((responseData) => {
        const time = Date.now() - now;
        this.logger.log(
          ` 📤 Response: ${getJsonString(responseData)?.slice(0, 300)} | ⏱️ ${time}ms`,
        );
      }),
      catchError((error) => {
        const time = Date.now() - now;

        this.logger.error(
          ` ❌ ${request.method} ${request.url} | ❗ Error: ${error.message} | ⏱️ ${time}ms`,
        );
        return throwError(() => error);
      }),
    );
  }
}
