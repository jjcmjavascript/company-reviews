import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { Type, TypePrimitive } from '@shared/entities/type.entity';

@Injectable()
class TypeCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async executeTransaction(typeDto: Partial<TypePrimitive>): Promise<Type> {
    await this.checkDuplicateName(typeDto.name);

    try {
      const newType = await this.prismaService.type.create({
        data: {
          name: typeDto.name,
          description: typeDto.description,
        },
      });

      return new Type({
        id: newType.id,
        name: newType.name,
        description: newType.description,
        deletedAt: newType.deletedAt,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        'An unexpected error occurred during type creation',
      );
    }
  }

  async checkDuplicateName(name: string): Promise<void> {
    const type = await this.prismaService.type.findFirst({
      where: { name },
    });

    if (type) {
      throw new ConflictException({ errors: ['Type name already exists'] });
    }
  }
}

export { TypeCreateRepository };
