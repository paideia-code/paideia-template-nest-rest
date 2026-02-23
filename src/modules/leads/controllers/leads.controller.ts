import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LeadsService } from '../services/leads.service';
import { CreateLeadDto } from '../dtos/create-lead.dto';
import { UpdateLeadDto } from '../dtos/update-lead.dto';
import { Lead } from '../entities/lead.entity';

@Controller('leads')
export class LeadsController {
  constructor(private readonly service: LeadsService) { }

  @Post()
  async create(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.service.create(createLeadDto);
  }

  @Get()
  async findAll(): Promise<Lead[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Lead> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ): Promise<Lead> {
    return this.service.update(id, updateLeadDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
