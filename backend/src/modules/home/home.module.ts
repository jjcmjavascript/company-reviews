import { PrismaModule } from '@modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { HomeIndexService } from './service/home-index.service';
import { HomeController } from './home.controller';
import { ReviewModule } from '@modules/review/review.module';
import { ReviewDetailsModule } from '@modules/review-details/review-details.module';
import { ReportedCompanyModule } from '@modules/reported-company/reported-company.module';

@Module({
  providers: [PrismaModule, HomeIndexService],
  imports: [ReviewModule, ReviewDetailsModule, ReportedCompanyModule],
  controllers: [HomeController],
  exports: [HomeIndexService],
})
export class HomeModule {}
