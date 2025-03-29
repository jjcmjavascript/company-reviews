import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { LikeDestroyRepository } from '../repositories/like-destroy.repository';
import { DislikeFindRepository } from '../repositories/dislike-find.repository';
import { DislikeCreateRepository } from '../repositories/dislike-create.repository';
import { ReviewDislikePrimitive } from '@shared/entities/review-dislike.entity';

@Injectable()
export class DislikeCreateService {
  private readonly logger = new Logger(DislikeCreateService.name);
  constructor(
    private readonly likeDestroyRepository: LikeDestroyRepository,
    private readonly dislikeFindRepository: DislikeFindRepository,
    private readonly dislikeCreateRepository: DislikeCreateRepository,
  ) {}

  async execute(params: {
    userId: number;
    reviewId: number;
  }): Promise<ReviewDislikePrimitive> {
    try {
      const existingDislike = await this.dislikeFindRepository.execute({
        userId: params.userId,
        reviewId: params.reviewId,
      });

      if (existingDislike) {
        this.logger.log(
          `User ${params.userId} already disliked review ${params.reviewId}`,
        );
        return existingDislike;
      }

      await this.likeDestroyRepository.execute({
        userId: params.userId,
        reviewId: params.reviewId,
      });

      return await this.dislikeCreateRepository.execute(params);
    } catch (error: unknown) {
      this.logger.error(
        `Failed to create dislike for user ${params.userId} on review ${params.reviewId}`,
        error,
      );

      throw new InternalServerErrorException('Failed to create dislike');
    }
  }
}
