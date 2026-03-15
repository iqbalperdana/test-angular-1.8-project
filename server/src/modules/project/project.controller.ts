import { Controller, Get, Query } from '@nestjs/common';
import { ProjectSearchDto } from './dto/project-search.dto';
import { ProjectService } from './project.service';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(@Query() projectSearchDto: ProjectSearchDto) {
    return await this.projectService.findAll(projectSearchDto);
  }
}
