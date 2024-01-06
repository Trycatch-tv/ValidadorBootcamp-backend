import { genereUUID } from 'src/utils/uuid/uuid.utils';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reviews')
export class ReviewEntity {
  @BeforeInsert()
  async generateId() {
    this.id = genereUUID();
  }

  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, type: 'float' })
  score_overall: number;

  @Column({ nullable: false, type: 'float' })
  score_curriculum: number;

  @Column({ nullable: false, type: 'float' })
  score_job_support: number;

  @Column({ nullable: false, type: 'float' })
  score: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  source: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  bootcamp_id: string;

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
