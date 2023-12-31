import { genereUUID } from 'src/utils/uuid/uuid.utils';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  @BeforeInsert()
  async generateUUID() {
    this.id = genereUUID();
  }

  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'bytea' })
  blob: Buffer;

  @Column({ nullable: false })
  mimetype: string;

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
