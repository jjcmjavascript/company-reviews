import { Controller, Get } from '@nestjs/common';
import { HomeIndexResponse } from './home.interfaces';
import { HomeIndexService } from './service/home-index.service';

@Controller('/')
export class HomeController {
  constructor(private readonly homeIndexService: HomeIndexService) {}

  @Get()
  async index() {}
}
