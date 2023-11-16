import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  constructor() {
    this.role = 'user';
  }
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  role: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ default: true })
  is_active: boolean;
}
