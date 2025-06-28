import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReviewFindAllRepository } from './repositories/review-find-all.repository';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly findAll: ReviewFindAllRepository) {}

  @Get('company/:reportedCompanyId')
  async findReviewsByCompanyId(
    @Param('reportedCompanyId', ParseIntPipe) reportedCompanyId: number,
  ) {
    return this.findAll.execute({ reportedCompanyId });
  }
}
