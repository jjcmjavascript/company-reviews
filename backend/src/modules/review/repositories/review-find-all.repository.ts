import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewCriteria } from '../review.interface';
import { Review } from '@shared/entities/review.entity';

@Injectable()
export class ReviewFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where: ReviewCriteria) {
    const result = await this.prismaService.review.findMany({
      where,
    });

    return Review.fromArray(result);
  }
}
