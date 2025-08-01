import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostModel } from './post.entity';

@Entity()
export class TagModel {
  // 현재의 경우에는 동일한 tag를 여러 개들고 있지 않을 가능성이 크다.
  // 따라서, 실제로는 id 없이 name 자체를 tag로 사용해도 좋다.
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => PostModel, (post) => post.tags)
  posts: PostModel[];

  @Column()
  name: string;
}
