import { Controller, Get } from '@nestjs/common';
import {EventPattern, MessagePattern} from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateSalesEvent } from './create-user.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreated(data: CreateSalesEvent) {
    this.appService.handleUserCreated(data);
  }

  @MessagePattern({cmd: 'get_sales'})
  getAnalytics(){
    return this.appService.getSales();
  }  
}

