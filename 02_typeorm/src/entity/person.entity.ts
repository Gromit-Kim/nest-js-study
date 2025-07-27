import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// entity로 등록하지 않는다.
export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}

export class StudentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => Name)
  name: Name;

  @Column()
  class: string;
}

@Entity()
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => Name)
  name: Name;

  @Column()
  salary: number;
}
