import { generateHash } from 'src/utils/crypto/crypto.utils';
import { genereUUID } from 'src/utils/uuid/uuid.utils';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @BeforeInsert()
  async setDefaultRole() {
    if (this.role === undefined || this.role === null || this.role === '') {
      this.role = 'user';
    }
    if (this.id === undefined || this.id === null || this.id === '') {
      this.id = genereUUID();
    }
    this.password = await generateHash(this.password);
  }

  @PrimaryColumn({ unique: true })
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
    enum: ['user', 'admin', 'bootcamp', 'bootcamps', 'companies', 'experts'],
  })
  role: string;

  @Column({ nullable: true })
  file_id: string;

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

  // @OneToOne(() => FileEntity, (fileEntity) => fileEntity.file)
  // file: FileEntity;

  // @OneToOne(() => FileEntity)
  // @JoinColumn({ name: 'user_id' })
  @Column({ nullable: false })
  avatar: string;
}
