import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReviewCreateDto } from '../dto/review-create.dto';
import { ReviewCreateRepository } from '../repositories/review-create.repository';
import { ReviewPrimitive } from '@shared/entities/review.entity';

@Injectable()
export class ReviewCreateService {
  private readonly logger = new Logger(ReviewCreateService.name);

  constructor(
    private readonly reviewCreateRepository: ReviewCreateRepository,
  ) { }

  async execute(params: ReviewCreateDto): Promise<ReviewPrimitive> {
    try {
      return this.reviewCreateRepository.execute(params);
    } catch (error: unknown) {
      this.logger.error({
        message: 'Error on create review',
        error: (error as Error).message,
      });

      throw new InternalServerErrorException('Error on create review');
    }
  }
}
