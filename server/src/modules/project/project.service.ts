import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/common/entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectPageDto } from './dto/project-page.dto';
import { ProjectViewDto } from './dto/project-view.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findAll(
    area?: string,
    keyword?: string,
    page?: number,
    limit?: number,
  ): Promise<ProjectPageDto> {
    const queryBuilder = this.projectsRepository.createQueryBuilder('project');
    if (area) {
      queryBuilder.leftJoinAndSelect('project.projectArea', 'projectArea');
      queryBuilder.andWhere('projectArea.area = :area', {
        area,
      });
    }
    if (keyword) {
      queryBuilder.andWhere('project.name LIKE :keyword', {
        keyword: `%${keyword}%`,
      });
    }

    const totalItems = await queryBuilder.getCount();
    let totalPages = 1;

    if (page && limit) {
      totalPages = Math.ceil(totalItems / limit);
      const skip = (page - 1) * limit;

      const pageProjects = await queryBuilder
        .skip(skip)
        .take(limit)
        .orderBy('project.id', 'ASC')
        .getMany();

      return {
        data: pageProjects.map((project: Project) =>
          this.projectEntityToProjectViewDto(project),
        ),
        pagination: {
          total: totalItems,
          page: page ?? 1,
          perPage: limit ?? 10,
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
