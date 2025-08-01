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
import { Between, Equal, ILike, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
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

  // @Post('users')
  // postUser() {
  //   return this.userRepository.save({
  //     // title: 'test title',
  //   });
  // }

  @Post('users')
  postUser() {
    // for dummy data
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `users${id}@google.com`,
      });
    // }
    // return this.userRepository.save({
    //   // title: 'test title',
    // });
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
      take: 10, // 기본값은 0인데 이는 전체 테이블의 길이만큼을 가져온다. ( 몇 개를 가져올 지)
    });
  }

  @Get('users')
  getUsers(){
    return this.userRepository.find({
      where: {
        // 아닌 경우 가져오기
        // 1이 아닌 모든 것을 가져온다.
        // id: Not(1), 

        // 적은 경우 가져오기 - 29까지
        // id: LessThan(30),
        // id: LessThanOrEqual(30), // 30까지
        
        // 많은 경우
        // id: MoreThan(30), // 31번 부터
        // id: MoreThanOrEqual(30), // 30부터

        // 동일
        // id: Equal(30), // 일반 30과 동일 

        // 유사값 가져오기
        // email: Like('%google%'), // google 앞 뒤로 어떤 글자가 들어가도 상관없다.
        
        // 대문자 소문자 구분 안하는 유사값
        // email: ILike('%GOOGLE%')

        // 사이값
        // id: Between(10, 15),

        // 해당되는 여러 개의 값
        // id: In([1, 2, 4, 99])

        // id가 Null인 경우 가져오기
        // id: IsNull(), 
      }
    })
  }

  // [ Relations에 대해 알아본다. ]
  // @Get('users')
  // getUsers() {
  //   return this.userRepository.find({
  //     relations: {
  //       profile: true, // profile도 함께 줌.
  //     },
  //   });
  // }

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

  @Post('sample')
  async sample(){
    // 모델에 해당되는 객체 생성 - 저장은 안하고, 객체만 생성한다.
    const user1 = this.userRepository.create({
      email: 'test@codefactory.ai',
    });

    // 아래처럼 할 수도 있지만 userModel은 생성자를 생성하지 않기 때문에 위와 같이 한다. 
    // new UserModel({
    //   email: 'test@codefactory.ai'
    // });

    // 생성 및 저장
    const user2 = await this.userRepository.save({
      email: 'test1@codefactory.ai',
    });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체한다.
    // 저장하지는 않는다. -> find를 해서 create를 한다. save는 안함
    const user3 = await this.userRepository.preload({
      id: 101,
      email: 'codefactory@cf.ai',
    });

    // 삭제하기
    await this.userRepository.delete(101);

    // 이 조건에 해당되는 모든 row의 'count' property를 2만큼 증가시키겠다.
    await this.userRepository.increment({
      id: 1,
    }, 'count', 2);

    await this.userRepository.decrement({
      id: 2,
    }, 'count', 1);

    // 갯수 카운팅하기
    // 대소문자 상관없이 0이라는 문자가 이메일에 들어간 row들의 총 개수
    const count = await this.userRepository.count({
      where: {
        email: ILike('%0%'),
      },
    })

    // sum
    const sum = await this.userRepository.sum('count', {
      email: ILike('%0%'),
    });

    // average
    const average = await this.userRepository.average('count', {
      id: LessThan(4),
    });

    // 최소값
    const min = await this.userRepository.minimum('count', {
      id: LessThan(4),
    });

    //최대값
    const max = await this.userRepository.maximum('count', {
      id: LessThan(4),
    });

    const users = await this.userRepository.find({
      where: {

      }
    })

    // 여러개가 해당되면 가장 처음값만 가져옴
    const userOne = await this.userRepository.findOne({
      where: {
        id:3,
      }
    })

    // pagination할 때 사용
    // take를 넣지 않았다면 전체에 해당되는 개수가 몇개인지를 알려주는 것임. 
    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    })

    return user1;
  }
}
