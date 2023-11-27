import { Column, Entity, PrimaryColumn } from 'typeorm';

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
  file_path: string;

  @Column({ nullable: false, default: true })
  is_active: boolean;
}
