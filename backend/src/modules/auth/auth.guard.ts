import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { config } from '@config/config';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '@decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { AuthJwtRefreshRepository } from './repositories/auth-jwt-refresh.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: AuthJwtRefreshRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request, 'access_token');

    try {
      if (!token) {
        throw new UnauthorizedException('Invalid token');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwt.jwtSecret,
      });

      request['user'] = payload;
    } catch {
      const result = await this.tryRefreshToken(request);

      if (result) {
        return true;
      }

      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private async tryRefreshToken(request: Request): Promise<boolean> {
    try {
      const refreshToken = this.extractTokenFromHeader(
        request,
        'refresh_token',
      );

      if (refreshToken) {
        const payload = await this.refreshTokenRepository.refreshTokens(
          request,
          refreshToken,
        );

        request['user'] = await this.jwtService.verifyAsync(
          payload.newAccessToken,
          {
            secret: config.jwt.jwtSecret,
          },
        );

        return true;
      }
    } catch {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request, tokenName: string): string {
    const cookies = request.headers.cookie?.split(';') || [];
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${tokenName}=`),
    );
    if (!tokenCookie) {
      return null;
    }
    const [, cookieValue] = tokenCookie.split('=');
    return cookieValue.trim();
  }
}
