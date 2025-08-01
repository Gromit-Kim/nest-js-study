import {
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  postUser() {
    return this.userRepository.save({
      // title: 'test title',
    });
  }

  // @Get('users')
  // getUsers() {
  //   return this.userRepository.find({
  //     select: {
  //       title: true,
  //     },
  //   });
  // }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 프로퍼티를 선택할지를 정의한다.
      // select를 정의하지 않는 경우(default)는
      // 모든 프로퍼티를 가져온다.
      // select를 정의하면 select에 정의된 프로퍼티만 가져온다.
      select: {
        id: true,
        // title: true,
      },
      // 필터링할 조건을 입력하게 된다.
      where: {
        // where 조건은 전부 and 조건으로 묶인다.
        version: 1, // version이 1인 것만 선택됨
        // id: 1,
        profile: {
          id: true, // 가져오는 관계의 것에 where을 넣는다.
        },
      },

      // or로 하고 싶은 경우는 []를 이용한다.
      // where: {
      //   [{id: 3}, {version: 3}],
      // }

      // 관계를 가져오는 방법
      relations: {
        profile: true,
      },

      // 정렬 방법
      // 정렬 기준이 되는 프로퍼티를 넣는다.
      order: {
        id: 'ASC', // 'DESC'
      },

      // 처음에 몇 개를 제외할 지
      skip: 2,
    });
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      relations: {
        profile: true, // profile도 함께 줌.
      },
    });
  }

  // @Patch('users/:id')
  // async patchUser(@Param('id') id: string) {
  //   const user = await this.userRepository.findOne({
  //     where: {
  //       id: parseInt(id),
  //     },
  //   });

  //   if (!user) {
  //     throw new NotFoundException();
  //   }

  //   return this.userRepository.save({
  //     ...user,
  //     title: user.title + '0',
  //   });
  // }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    // const user = await this.userRepository.save({
    //   email: 'asdf@a.com',
    // });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    // options에서 cascase를 true로 하면
    // profile도 함께 생성해준다.
    const user = await this.userRepository.save({
      email: 'asdf@a.com',
      profile: {
        profileImg: 'asdf.jpg',
      },
    });
  }

  @Post('user/post')
  async createuserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuser@codefactory.ai',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'nestjs lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'programing lectures',
    });

    const tag1 = await this.tagRepository.save({
      name: 'javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJs Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
