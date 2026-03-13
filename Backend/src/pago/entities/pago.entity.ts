import { Club } from '../../clubes/entities/club.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column({ nullable: true })
  clubId: number;

  @ManyToOne(() => Club, (club) => club.pagos, { 
    onDelete: 'SET NULL',
    nullable: true
  })
  @JoinColumn({ name: 'clubId' })
  club: Club;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column({ nullable: true })
  comprobante: string;

  @Column({ type: 'mediumtext', nullable: true })
  comprobanteArchivo: string;

  @CreateDateColumn()
  fecha: Date;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ nullable: true })
  categoria: string;

  @Column({ nullable: true })
  partidoId: number;

  @Column({ nullable: true })
  cantidadJugadores: number;

  @Column({ nullable: true })
  motivo: string;
}