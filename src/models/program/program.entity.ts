import { genereUUID } from 'src/utils/uuid/uuid.utils';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('programs')
export class ProgramEntity {
  @BeforeInsert()
  async generateId() {
    this.id = genereUUID();
  }

  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  mode: string;

  @Column({ nullable: false, type: 'float' })
  duration: number;

  @Column({ nullable: false })
  bootcamp_id: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: true, default: null })
  content: string;

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
