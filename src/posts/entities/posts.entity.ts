import { UserModel } from '02_typeorm/src/entity/user.entity';
import { UsersModel } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostsModel {
  @PrimaryGeneratedColumn()
  id: number;

  // FK를 이용해서 UsersModel과 연동한다.
  // 컬럼을 만드는 게 아니라, 관계를 만드는 것이다.
  /**
   * ManyToOne의 어노테이션
   * arg1: one에 해당되는 클래스 타입을 반환하는 함수를 넣어준다.
   * arg2: 앞의 arg1이 반환한 클래스 타입을 함수의 파라미터로 받아서
   *      1에 해당하는 것중 어떤 프로퍼티와 연결할지를 표시한다.
   * 나중에 PostModel 클래스에서 author 값을 불러올 때 author 값은 유저 모델의 모습으로 대체됨
   * arg3: object로 options을 넣는다.
   */
  @ManyToOne(() => UserModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
