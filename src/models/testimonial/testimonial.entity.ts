import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('testimonials')
export class TestimonialEntity {
  @PrimaryColumn()
  id: string;

  // TODO: Pendiente ajustar segun las relaciones
  @Column({ nullable: false })
  user_id: string;

  // TODO: Pendiente ajustar segun las relaciones
  @Column({ nullable: false })
  bootcamp_id: string;

  @Column({ nullable: false })
  description: string;

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
