import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReviewFindAll } from '../review.interface';

@Injectable()
export class ReviewFindAllRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(where: ReviewFindAll) {
    return this.prismaService.review.findMany({
      where,
    });
  }
}
