import { genereUUID } from 'src/utils/uuid/uuid.utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bootcamps')
export class BootcampEntity {
  @PrimaryColumn({ unique: true, default: genereUUID() })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  facebook_url: string;

  @Column({ nullable: true })
  instragram_url: string;

  @Column({ default: false })
  is_endorsed: boolean;

  @Column({ nullable: true })
  endorsed_by: string;

  @Column({ nullable: false, default: false })
  is_verified: boolean;

  @Column({ nullable: true, default: 0 })
  score: number;

  @Column({ nullable: false })
  country_name: string;

  @Column({ nullable: false })
  country_iso: string;

  @Column({ nullable: false, enum: ['virtual', 'presencial', 'hibrido'] })
  mode: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @Column({ nullable: true })
  terms_and_conditions: string;

  // TODO: Pendiente para definir en las relaciones
  @Column({ nullable: false })
  user_id: string;

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
