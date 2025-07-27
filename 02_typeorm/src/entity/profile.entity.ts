import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserModel, (user) => user.profile)
  @JoinColumn() // userid를 볼 수 있다. 다른 테이블을 레퍼런스 하는 id를 현재 테이블에 만든다.
  user: UserModel;

  @Column()
  profileImg: string;
}
