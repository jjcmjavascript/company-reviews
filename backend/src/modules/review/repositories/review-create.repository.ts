import { Injectable } from '@nestjs/common';
import { ReviewPrimitive } from '@shared/entities/review.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewCreateDto } from '../dto/review-create.dto';
import { ReviewVerificationStatus } from '@shared/enums/commons.enum';

@Injectable()
export class ReviewCreateRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async execute(params: ReviewCreateDto): Promise<ReviewPrimitive> {
    const result = await this.prismaService.$transaction(async (ctx) => {
      
      const review = await ctx.review.create({
        data: {
          userId: 1,
          reportedCompanyId: params.reportedCompanyId,
          reviewerTypeId: params.reviewerTypeId,
          description: params.description,
          verificationStatus: ReviewVerificationStatus.NOT_VERIFIED,
        },
      });

      const reviewDetail = await ctx.reviewDetail.createManyAndReturn({
        data: params.reviewDetails.map((reviewDetail) => ({
          reviewId: review.id,
          score: reviewDetail.score,
          categoryId: reviewDetail.categoryId,
        })),
      });

      return {...review, reviewDetail }
    });

    return result as ReviewPrimitive;
  }
}
