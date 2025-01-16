import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class ReviewFindAll {
  constructor(private readonly prismaService: PrismaService) {}

  async execute() {}
}
