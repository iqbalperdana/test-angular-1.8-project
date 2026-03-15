import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/common/entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectPageDto } from './dto/project-page.dto';
import { ProjectSearchDto } from './dto/project-search.dto';
import { ProjectViewDto } from './dto/project-view.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findAll(projectSearchDto: ProjectSearchDto): Promise<ProjectPageDto> {
    const queryBuilder = this.projectsRepository.createQueryBuilder('project');
    queryBuilder.leftJoinAndSelect('project.company', 'company');
    queryBuilder.leftJoinAndSelect('project.projectArea', 'projectArea');

    if (projectSearchDto.keyword) {
      queryBuilder.andWhere('project.name LIKE :keyword', {
        keyword: `%${projectSearchDto.keyword}%`,
      });
    }
    if (projectSearchDto.area) {
      queryBuilder.andWhere('projectArea.area = :area', {
        area: projectSearchDto.area,
      });
    }
    if (projectSearchDto.company) {
      queryBuilder.andWhere('company.name = :company', {
        company: projectSearchDto.company,
      });
    }

    const totalItems = await queryBuilder.getCount();
    let totalPages = 1;

    if (projectSearchDto.page && projectSearchDto.perPage) {
      totalPages = Math.ceil(totalItems / projectSearchDto.perPage);
      const skip = (projectSearchDto.page - 1) * projectSearchDto.perPage;

      const pageProjects = await queryBuilder
        .skip(skip)
        .take(projectSearchDto.perPage)
        .orderBy('project.id', 'ASC')
        .getMany();

      return {
        data: pageProjects.map((project: Project) =>
          this.projectEntityToProjectViewDto(project),
        ),
        pagination: {
          total: totalItems,
          page: projectSearchDto.page ?? 1,
          perPage: projectSearchDto.perPage ?? 10,
          totalPages,
        },
      };
    }

    const projects = await queryBuilder.orderBy('project.id', 'ASC').getMany();

    return {
      data: projects.map((project: Project) =>
        this.projectEntityToProjectViewDto(project),
      ),
    };
  }

  projectEntityToProjectViewDto(project: Project): ProjectViewDto {
    return {
      projectName: project.name,
      projectStart: project.startDate,
      projectEnd: project.endDate,
      company: project.company?.name,
      description: project.description,
      projectValue: project.value,
      area: project.projectArea?.area,
    };
  }
}
