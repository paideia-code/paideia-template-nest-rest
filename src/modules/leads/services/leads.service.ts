import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadsRepository } from '../repositories/leads.repository';
import { Lead } from '../entities/lead.entity';
import { CreateLeadDto } from '../dtos/create-lead.dto';
import { UpdateLeadDto } from '../dtos/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly repository: LeadsRepository) { }

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const lead = new Lead();
    Object.assign(lead, { ...createLeadDto, status: 'new' as const });
    return this.repository.create(lead);
  }

  async findAll(): Promise<Lead[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.repository.findById(id);
    if (!lead) {
      throw new NotFoundException(`Lead with id ${id} not found`);
    }
    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    await this.findOne(id);
    const updated = await this.repository.update(id, updateLeadDto);
    return updated as Lead;
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    return this.repository.delete(id);
  }
}
