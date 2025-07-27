import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello, World!';
  }

  @Get()
  getHome(): string {
    return 'Home Page';
  }

  @Get('/post')
  getPost(): string {
    return 'Post Page';
  }

  @Get('/user')
  getUser(): string {
    return 'User Page';
  }
}
