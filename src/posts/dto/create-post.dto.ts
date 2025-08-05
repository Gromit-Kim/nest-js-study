import { PickType } from '@nestjs/mapped-types';
import { PostsModel } from '../entities/posts.entity';

// Pick, Omit, Partial - ts -> 타입을 반환
// PickType, OmitType, PartialType -> 값을 반환 (extends를 할 수 있다.)

export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {}
