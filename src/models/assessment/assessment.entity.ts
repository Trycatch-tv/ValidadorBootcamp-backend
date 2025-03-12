import { genereUUID } from 'src/utils/uuid/uuid.utils';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity('assessments')
export class AssessmentEntity {
  @BeforeInsert()
  async generateId() {
    this.id = genereUUID();
  }

  @Column({ primary: true, nullable: false })
  id?: string;

  @Column({ nullable: false })
  bootcamp_id: string;

  @Column({ nullable: false })
  category_id: number;

  @Column({ nullable: false })
  criteria_id: string;

  @Column({ nullable: false })
  weight: number;

  @Column({ nullable: false, default: true })
  is_active?: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_at?: Date;
}
