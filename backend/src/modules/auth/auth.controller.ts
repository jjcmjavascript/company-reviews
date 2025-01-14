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
import { Public } from '@decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authJwtSingInRepostory: AuthJwtSingInRepostory) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response,
  ) {
    return this.authJwtSingInRepostory.signIn(
      response,
      signInDto.email,
      signInDto.password,
    );
  }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('refresh')
  // async refresh(
  //   @Body('refresh_token') refreshToken: string,
  //   @Res({ passthrough: true }) response,
  // ) {
  //   return this.authService.refreshTokens(response, refreshToken);
  // }
}
