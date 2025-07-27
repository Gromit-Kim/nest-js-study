import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

// TypeOrmModule.forRoot()는 typeORM에 연결 설정을 할 때, appmodule에서 사용하고
// Feature는 모델에 해당되는 레포지토리를 주입할 때 사용한다.
// PostsModel를 넣으면 typeORM이 알아서 model과 관련된 레포지토리를 만들어 준다.
@Module({
  imports: [TypeOrmModule.forFeature([PostsModel])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
