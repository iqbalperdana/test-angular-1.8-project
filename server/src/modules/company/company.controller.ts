import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('api/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }
}
