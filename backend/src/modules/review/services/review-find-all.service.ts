import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ReviewFindAllRepository } from '../repositories/review-find-all.repository';
import { Review, ReviewPrimitive } from '@shared/entities/review.entity';
import { ReviewFindAll } from '../review.interface';

@Injectable()
export class ReviewFindAllService {
  private readonly logger = new Logger(ReviewFindAllService.name);
  constructor(
    private readonly reviewFindAllRepository: ReviewFindAllRepository,
  ) {}

  async execute(where: ReviewFindAll) {
    try {
      const result = await this.reviewFindAllRepository.execute(where);

      return Review.fromArrayToReviewJsonResponse(result as ReviewPrimitive[]);
    } catch (error) {
      this.logger.error({
        message: `Error on find all reviews: ${error.message}`,
        stack: error.stack,
      });
      throw new InternalServerErrorException('Error on find all reviews');
    }
  }
}
