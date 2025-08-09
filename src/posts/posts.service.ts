import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, LessThan, MoreThan, Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { HOST, PROTOCOL } from 'src/common/const/env.const';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'], // 현재 모델과 관련된 데이터를 전부 가져오게 할 수 있다.
    });
  }

  async generatePosts(userId: number) {
    for (let i = 0; i < 100; i++) {
      await this.createPost(userId, {
        title: `임의로 생성된 포스트 제목 : ${i}`,
        content: `임의로 생성된 포스트 내용: ${i}`,
      });
    }
  }

  // 오름차순으로 정렬하는 pagination만 구현한다.
  async paginatePosts(dto: PaginatePostDto) {
    if (dto.page) {
      return this.pagePaginatePosts(dto);
    }
    return this.cursorPaginatePosts(dto);
  }

  async pagePaginatePosts(dto: PaginatePostDto) {
    /**
     * data: Data[],
     * total: number
     * next: ??
     *
     * [1] [2] [3] [4] 처럼 페이지가 이미 정해져있다.
     * 누른 순간 몇 번째 페이지를 요청할 지 알기 때문에 next가 의미가 없고,
     * [1] 다음에 [2]를 누른다는 보장이 없으므로 next가 필요가 없다.
     */
    const [posts, count] = await this.postsRepository.findAndCount({
      skip: dto.take * (dto.page! - 1),
      take: dto.take,
      order: {
        createdAt: dto.order__createdAt,
      },
    });
    return {
      data: posts,
      total: count,
    };
  }

  async cursorPaginatePosts(dto: PaginatePostDto) {
    const where: FindOptionsWhere<PostsModel> = {};
    if (dto.where__id__less_than) {
      where.id = LessThan(dto.where__id__less_than);
    } else if (dto.where__id__more_than) {
      where.id = MoreThan(dto.where__id__more_than);
    }

    const posts = await this.postsRepository.find({
      where: where,
      order: {
        createdAt: dto.order__createdAt,
      },
      take: dto.take,
    });

    /**
     * Response
     *
     * data: Data[], // 이 부분이 posts
     * cursor: {
     *  afetr: 마지막 데이터의 ID
     * },
     * count: 응답한 데이터의 갯수,
     * next: 다음 요청할 때 사용할 URL
     */

    // 해당되는 포스트가 0개 이상이면
    // 마지막 포스트를 가져오고
    // 아니면 null을 반환한다.
    const lastItem =
      posts.length > 0 && posts.length === dto.take
        ? posts[posts.length - 1]
        : null;

    const nextUrl = lastItem && new URL(`${PROTOCOL}://${HOST}/posts`);
    if (nextUrl) {
      /**
       * dto의 키값들을 루팡하면서
       * 키값에 해당되는 벨류가 존재하면
       * param에 그대로 붙여넣는다.
       *
       * 단, where__id_more_than 값만 lastItem의 마지막 값으로 넣어준다.
       */
      for (const key of Object.keys(dto)) {
        if (dto[key]) {
          if (
            key !== 'where__id__more_than' &&
            key !== 'where__id__less_than'
          ) {
            nextUrl.searchParams.append(key, dto[key]);
          }
        }
      }

      let key: string | null = null;
      if (dto.order__createdAt === 'ASC') {
        key = 'where__id__more_than';
      } else {
        key = 'where__id__less_than';
      }

      nextUrl.searchParams.append(key, lastItem.id.toString());
    }

    return {
      data: posts,
      cursor: {
        after: lastItem?.id ?? null,
      },
      count: posts.length,
      next: nextUrl?.toString(),
    };
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(authorId: number, postDto: CreatePostDto) {
    // 1) create method -> 저장할 객체를 생성한다.
    // 2) save method -> 객체를 저장한다. (Create method에서 생성한 객채를 저장한다.)

    // create()는 실제로 데이터베이스에 저장하는 게 아니고, 객체만 생성하므로 동기로 이루어진다.
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...postDto,
      likeCount: 0,
      commentCount: 0,
    });

    // 위의 post와 다르게 id가 있다.
    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(postId: number, postDto: UpdatePostDto) {
    const { title, content } = postDto;
    // save의 기능
    // 1) 만약 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약 데이터가 존재한다면 (같은 id 값이 존재한다면) 존재하던 값을 업데이트한다.

    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }
}
