import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../entities/lead.entity';

@Injectable()
export class LeadsRepository {
  constructor(
    @InjectRepository(Lead)
    private readonly repository: Repository<Lead>,
  ) { }

  async create(lead: Lead): Promise<Lead> {
    return this.repository.save(lead);
  }

  async findById(id: string): Promise<Lead | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Lead[]> {
    return this.repository.find();
  }

  async update(id: string, data: Partial<Lead>): Promise<Lead | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
