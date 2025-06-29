import { Module } from '@nestjs/common';
import { ReviewFindAllRepository } from './repositories/review-find-all.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { ReviewFindAllService } from './services/review-find-all.service';
import { ReviewController } from './review.controller';
import { ReviewCreateService } from './services/review-create.service';
import { ReviewCreateRepository } from './repositories/review-create.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    ReviewFindAllRepository,
    ReviewCreateRepository,
    ReviewFindAllService,
    ReviewCreateService,
  ],
  controllers: [ReviewController],
  exports: [ReviewFindAllRepository, ReviewFindAllService],
})
export class ReviewModule { }
