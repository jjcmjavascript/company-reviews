import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthJwtSingInRepostory } from './repositories/auth-jwt-sigin.repository';
import { SignInDto } from './auth.dto';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private authJwtSingInRepostory: AuthJwtSingInRepostory) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.authJwtSingInRepostory.signIn(
      response,
      signInDto.email,
      signInDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-mobile')
  async signInMobile(@Body() signInDto: SignInDto) {
    const result = await this.authJwtSingInRepostory.signInMobile(
      signInDto.email,
      signInDto.password,
    );

    return result;
  }
}
