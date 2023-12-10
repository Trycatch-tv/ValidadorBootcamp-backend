import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  bootcamp_id: string;

  @Column({ nullable: false })
  file_name: string;

  @Column({ nullable: false })
  file_type: string;

  @Column({ nullable: false })
  file_path: string;

  @Column({ nullable: false, default: true })
  is_active: boolean;

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
}
