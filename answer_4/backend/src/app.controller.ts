import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UserVO } from './vo/user.vo';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get("api")
  async getRandomUsers(@Query() params) {
    return this.appService.getRandomUsers(params["result"], params["page"]);
  }
}
