import { genereUUID } from 'src/utils/uuid/uuid.utils';
import { 
  BeforeInsert, 
  Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @BeforeInsert()
  async setDefaultRole() {
    if (this.id === undefined || this.id === null || this.id === '') {
      this.id = genereUUID();
    }
  }

  @PrimaryColumn({ 
    unique: true,
    nullable: false,
    generated: 'uuid',
  })
  id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    nullable: false,
    default: 'user',
    enum: ['user', 'admin', 'bootcamp'],
  })
  role: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
