import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DislikeDestroyRepository } from '../repositories/dislike-destroy.repository';
import { LikeCreateRepository } from '../repositories/like-create.repository';
import { LikeFindRepository } from '../repositories/like-find.repository';
import { ReviewLikePrimitive } from '@shared/entities/review-like.entity';

@Injectable()
export class LikeCreateService {
  private readonly logger = new Logger(LikeCreateService.name);

  constructor(
    private readonly dislikeDestroyRepository: DislikeDestroyRepository,
    private readonly likeCreateRepository: LikeCreateRepository,
    private readonly likeFindRepository: LikeFindRepository,
  ) {}

  async execute(params: {
    userId: number;
    reviewId: number;
  }): Promise<ReviewLikePrimitive> {
    try {
      const existingLike = await this.likeFindRepository.execute({
        userId: params.userId,
        reviewId: params.reviewId,
      });

      if (existingLike) {
        this.logger.log(
          `User ${params.userId} already liked review ${params.reviewId}`,
        );

        return existingLike;
      }

      await this.dislikeDestroyRepository.execute({
        userId: params.userId,
        reviewId: params.reviewId,
      });

      return await this.likeCreateRepository.execute(params);
    } catch (error: unknown) {
      this.logger.error(
        `Failed to create like for user ${params.userId} on review ${params.reviewId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to create like');
    }
  }
}
