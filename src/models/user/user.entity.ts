import { generateHash } from 'src/utils/crypto/crypto.utils';
import { genereUUID } from 'src/utils/uuid/uuid.utils';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  [x: string]: any;
  @BeforeInsert()
  async setDefaultRole() {
    if (this.role === undefined || this.role === null || this.role === '') {
      this.role = 'user';
    }
    this.password = await generateHash(this.password);
  }

  @PrimaryColumn({ unique: true, default: genereUUID() })
  id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    nullable: false,
    default: 'user',
    enum: ['user', 'admin', 'bootcamp', 'company', 'expert'],
  })
  role: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_loged_in?: boolean;

  @Column({ nullable: true })
  refresh_token?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_at: Date;

  // @OneToOne(() => FileEntity, (file) => file.user_id, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'file_id' })
  // avatar: FileEntity;
}
