import { Controller, Get, Query } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(
    @Query('area') area?: string,
    @Query('keyword') keyword?: string,
    @Query('page') page?: number,
    @Query('per_page') limit?: number,
  ) {
    return await this.projectService.findAll(area, keyword, page, limit);
  }
}
