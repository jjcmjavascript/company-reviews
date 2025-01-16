import { Controller, Get } from '@nestjs/common';
import { HomeIndexResponse } from './home.interfaces';
import { HomeRepository } from './home.repository';

@Controller()
export class HomeController {
  constructor(private readonly homeRepository: HomeRepository) {}

  @Get()
  async index(): Promise<HomeIndexResponse[]> {
    return await this.homeRepository.execute();
  }
}
