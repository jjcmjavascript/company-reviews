import { Module } from '@nestjs/common';
import { ReviewFindAllRepository } from './repositories/review-find-all.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewFindAllService } from './services/review-find-all.service';
import { ReviewController } from './review.controller';

@Module({
  imports: [PrismaModule],
  providers: [ReviewFindAllRepository, ReviewFindAllService],
  controllers: [ReviewController],
  exports: [ReviewFindAllService],
})
export class ReviewModule {}
