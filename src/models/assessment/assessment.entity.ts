import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('assessments')
export class AssessmentEntity {
  @Column({ primary: true, generated: true, type: 'int' })
  id: number;

  @Column({ nullable: false, length: 100 })
  bootcamp_id: string;

  @Column({ nullable: false, type: 'int' })
  category_id: number;

  @Column({ nullable: false, type: 'int' })
  criteria_id: number;

  @Column({ nullable: false, type: 'int' })
  weight: number;
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
