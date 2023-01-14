import { Injectable } from '@nestjs/common';
import { CreateSalesEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly salesOrder:any[] =[];

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateSalesEvent){
    console.log('handlerUserCreated - SALES', data);
    this.salesOrder.push({
      email: data.email,
      timestamp: new Date(),
    });
  }  

  getSales(){
    return this.salesOrder;
  }
}
