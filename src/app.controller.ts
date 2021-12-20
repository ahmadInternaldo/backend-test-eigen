import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Check Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async statusCheck(): Promise<any> {
    return this.appService.statusCheck();
  }
}
