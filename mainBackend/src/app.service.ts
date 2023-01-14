import {Inject,Injectable } from '@nestjs/common';
import { CreateUserRequest } from './create-user.request.dto';
import {ClientProxy} from '@nestjs/microservices';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users:any[] = [];

  constructor(
    @Inject('USERS') private readonly communicationClient: ClientProxy,
    @Inject('SALES') private readonly salesClient: ClientProxy,
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserRequest){
    this.users.push(createUserRequest);
    this.communicationClient.emit('user_created', new CreateUserEvent(createUserRequest.email));
    this.salesClient.emit('user_created', new CreateUserEvent(createUserRequest.email));
  }

  getSales(){
    return this.salesClient.send({cmd: 'get_sales'}, {});
  }
}
