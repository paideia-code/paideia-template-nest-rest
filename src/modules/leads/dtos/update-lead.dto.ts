export class UpdateLeadDto {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'lost';
}
