import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { SubType, SubTypePrimitive } from '@shared/entities/subtype.entity';

@Injectable()
export class SubtypeFindOneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    where: Partial<SubTypePrimitive>,
    throwError: boolean = true,
  ): Promise<SubType | null> {
    const subtype = await this.prismaService.subType.findFirst({
      where,
    });

    if (!subtype && throwError) {
      throw new NotFoundException('Subtype not found');
    }

    return subtype ? SubType.create(subtype) : null;
  }
}
