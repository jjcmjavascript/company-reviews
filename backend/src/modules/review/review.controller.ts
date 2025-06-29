import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ReviewFindAllRepository } from './repositories/review-find-all.repository';
import { ReviewCreateDto } from './dto/review-create.dto';
import { ReviewCreateService } from './services/review-create.service';

@Controller('reviews/company')
export class ReviewController {
  constructor(
    private readonly findAll: ReviewFindAllRepository,
    private readonly createService: ReviewCreateService,
  ) { }

  @Get(':reportedCompanyId')
  async findReviewsByCompanyId(
    @Param('reportedCompanyId', ParseIntPipe) reportedCompanyId: number,
  ) {
    return this.findAll.execute({ reportedCompanyId });
  }

  @Post()
  async create(@Body() review: ReviewCreateDto) {
    return this.createService.execute(review);
  }
}
