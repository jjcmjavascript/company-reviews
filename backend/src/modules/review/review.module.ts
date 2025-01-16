import { Module } from '@nestjs/common';
import { ReviewFindAllRepository } from './repositories/review-find-all.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReviewFindAllRepository],
  exports: [ReviewFindAllRepository],
})
export class ReviewModule {}
