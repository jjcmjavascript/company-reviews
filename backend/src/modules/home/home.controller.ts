import { Controller, Get } from '@nestjs/common';
import { HomeIndexResponse } from './home.interfaces';
import { HomeIndexService } from './service/home-index.service';
import { Public } from '@shared/decorators/public.decorator';

@Controller('/')
export class HomeController {
  constructor(private readonly homeRepository: HomeIndexService) {}

  @Public()
  @Get()
  async index(): Promise<HomeIndexResponse[]> {
    const result = await this.homeRepository.execute();

    return result;
  }
}
