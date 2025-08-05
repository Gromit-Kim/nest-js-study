import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { User } from 'src/users/decorator/user.decorator';
import { UsersModel } from 'src/users/entities/users.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 post를 다 가져온다.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }
  // 2) GET /posts/:id
  //    id에 해당되는 post를 가져온다.
  //    예를 들어서 id=1일 경우 id가 1인 포스트를 가져온다.
  // path parameter는 :id로 한다. 이는 argument로 인젝트 된다. 모든 param은 기본적으로 string임
  // path parameter가 많아질 수 있으므로 그것은 @Param('id')로 명세해서 구분해야한다. url로부터 가져올 것이고 그 아이디는 id이다.
  //
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3)  POST /posts
  //     POST를 생성한다.
  @Post()
  @UseGuards(AccessTokenGuard)
  postPosts(
    // @User('id') userId : number,  // (data)를 집어넣어서 데코레이터 사용
    @User() user: UsersModel,
    @Body() body: CreatePostDto,
    // @Body('title') title: string,
    // @Body('content') content: string,
  ) {
    return this.postsService.createPost(user.id, body);
  }

  // 4) PATCH /posts/:id
  //    id에 해당되는 POST를 변경한다.
  @Patch(':id')
  patchPost(
    @Param('id', ParseIntPipe) id: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(+id, title, content);
  }

  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: string) {
    return this.postsService.deletePost(+id);
  }
}
