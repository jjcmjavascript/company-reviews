import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { SubType, SubTypePrimitive } from '@shared/entities/subtype.entity';

@Injectable()
class SubtypeCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async executeTransaction(
    subtypeDto: Partial<SubTypePrimitive>,
  ): Promise<SubType> {
    await this.checkDuplicateName(subtypeDto.name);

    try {
      const newSubtype = await this.prismaService.subType.create({
        data: {
          name: subtypeDto.name,
          description: subtypeDto.description,
          typeId: subtypeDto.typeId,
        },
      });

      return new SubType({
        id: newSubtype.id,
        name: newSubtype.name,
        description: newSubtype.description,
        deletedAt: newSubtype.deletedAt,
        typeId: newSubtype.typeId,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        'An unexpected error occurred during subtype creation',
      );
    }
  }

  async checkDuplicateName(name: string): Promise<void> {
    const subtype = await this.prismaService.subType.findFirst({
      where: { name },
    });

    if (subtype) {
      throw new ConflictException({ errors: ['Subtype name already exists'] });
    }
  }
}

export { SubtypeCreateRepository };
