import { Module } from '@nestjs/common';
import { ReviewDetailsFindTopRepository } from './repositories/review-details-find-top.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReviewDetailsFindTopRepository],
  exports: [ReviewDetailsFindTopRepository],
})
export class ReviewDetailsModule {}
