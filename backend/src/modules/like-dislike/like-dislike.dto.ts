import { IsInt, IsPositive } from 'class-validator';

export class LikeDislikeCreateDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  reviewId: number;
}

export class LikeDislikeFindAllDto {
  @IsInt()
  @IsPositive()
  reviewId: number;
}
