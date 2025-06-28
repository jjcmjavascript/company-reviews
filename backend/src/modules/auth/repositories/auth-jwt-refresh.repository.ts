import { config } from '@config/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface Tokens {
  newAccessToken: string;
  newRefreshToken: string;
}

@Injectable()
export class AuthJwtRefreshRepository {
  constructor(private readonly jwtService: JwtService) {}

  async refreshTokens(request: Request, refreshToken: string): Promise<Tokens> {
    try {
      const verifyResult = await this.jwtService.verifyAsync(refreshToken, {
        secret: config.jwt.jwtSecret,
      });

      const payload = {
        sub: verifyResult.sub,
        username: verifyResult.username,
        scopes: verifyResult.scopes,
      };

      const newAccessToken = await this.jwtService.signAsync(payload, {
        expiresIn: config.jwt.jwtExpiresIn,
      });

      const newRefreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: config.jwt.jwtRefreshExpiresIn,
      });

      request.res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: config.app.isProduction,
        maxAge: config.jwt.jwtExpiresIn,
        sameSite: 'lax',
      });

      request.res.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: config.app.isProduction,
        maxAge: config.jwt.jwtRefreshExpiresIn,
        sameSite: 'lax',
      });

      return {
        newAccessToken,
        newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
