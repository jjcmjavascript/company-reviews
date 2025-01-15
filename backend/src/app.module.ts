import { Module } from '@nestjs/common';
import { SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';

import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { config } from '@config/config';
// import { ScheduleModule } from '@nestjs/schedule';
import { SubTypeModule } from './modules/subtype/subtype.module';

const providers = [];

if (config.app.isProduction) {
  providers.push({
    provide: APP_FILTER,
    useClass: SentryGlobalFilter,
  });
}

providers.push({
  provide: 'APP_GUARD',
  useClass: AuthGuard,
});

@Module({
  imports: [
    SentryModule.forRoot(),
    // ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    SubTypeModule,
  ],
  controllers: [],
  providers,
})
export class AppModule {}
