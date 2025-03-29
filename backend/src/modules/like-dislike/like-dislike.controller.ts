import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LikeCreateService } from './services/like-create.service';
import { DislikeCreateService } from './services/dislike-create.service';
import {
  LikeDislikeCreateDto,
  LikeDislikeFindAllDto,
} from './like-dislike.dto';
import { LikeFindAllRepository } from './repositories/like-find-all.repository';
import { DislikeFindAllRepository } from './repositories/dislike-find-all.repository';

@Controller('like-dislike')
export class LikeDislikeController {
  constructor(
    private readonly likeCreateService: LikeCreateService,
    private readonly dislikeCreateService: DislikeCreateService,
    private readonly likeFindAllRepository: LikeFindAllRepository,
    private readonly dislikeFindAllRepository: DislikeFindAllRepository,
  ) {}

  @Get('like')
  @HttpCode(HttpStatus.OK)
  async allLikes(@Body() body: LikeDislikeFindAllDto) {
    return await this.likeFindAllRepository.execute({
      reviewId: body.reviewId,
    });
  }

  @Post('like')
  @HttpCode(HttpStatus.CREATED)
  async like(@Body() body: LikeDislikeCreateDto) {
    return await this.likeCreateService.execute(body);
  }

  @Get('dislike')
  @HttpCode(HttpStatus.OK)
  async allDislike(@Body() body: LikeDislikeFindAllDto) {
    return await this.dislikeFindAllRepository.execute({
      reviewId: body.reviewId,
    });
  }

  @Post('dislike')
  @HttpCode(HttpStatus.CREATED)
  async dislike(@Body() body: LikeDislikeCreateDto) {
    return await this.dislikeCreateService.execute(body);
  }
}
