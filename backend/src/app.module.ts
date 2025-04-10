import { Module } from '@nestjs/common';
import { SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';

import { config } from '@config/config';
// import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { HomeModule } from '@modules/home/home.module';
import { ReportedCompanyModule } from '@modules/reported-company/reported-company.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserRolesGuard } from './modules/user-roles/user-roles.guard';
import { UserRolesModule } from '@modules/user-roles/user-roles.module';
import { LikeDislikeModule } from '@modules/like-dislike/like-dislike.module';

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

providers.push({
  provide: 'APP_GUARD',
  useClass: UserRolesGuard,
});

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    SentryModule.forRoot(),
    // ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    ReportedCompanyModule,
    HomeModule,
    UserRolesModule,
    LikeDislikeModule,
  ],
  controllers: [],
  providers,
})
export class AppModule {}
