import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('leads')
export class Lead {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column({ nullable: true })
	phone?: string;

	@Column({ nullable: true })
	company?: string;

	@Column({
		type: 'enum',
		enum: ['new', 'contacted', 'qualified', 'lost'],
		default: 'new',
	})
	status: 'new' | 'contacted' | 'qualified' | 'lost';

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
