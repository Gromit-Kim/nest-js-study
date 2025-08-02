import { Body, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Post } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  postUser(
    @Body('nickanme') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.createUser(nickname, email, password);
  }
}
