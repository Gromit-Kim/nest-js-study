import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersModel])],
  exports: [UsersService], // 다른 모듈을 import 햇을 때 이 export 안의 것을 이용할 수 있다.
  controllers: [UsersController],
  // 현재 모듈의 providers 안에 입력하는 값은 이 module 안에서만 이용가능 한 값이다.
  // 이 모듈을 다른 고셍서 임포트 했을 때 이 users service를 사용할 수 있게 하려면 exports를 해야한다.
  providers: [UsersService],
})
export class UsersModule {}
