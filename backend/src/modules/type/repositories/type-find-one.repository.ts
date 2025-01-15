import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { Type, TypePrimitive } from '@shared/entities/type.entity';

@Injectable()
export class TypeFindOneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    where: Partial<TypePrimitive>,
    throwError: boolean = true,
  ): Promise<Type | null> {
    const type = await this.prismaService.type.findFirst({
      where: { ...where, deletedAt: null },
    });

    if (!type && throwError) {
      throw new NotFoundException('Type not found');
    }

    return type ? Type.create(type) : null;
  }
}
