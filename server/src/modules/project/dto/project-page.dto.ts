import { ProjectViewDto } from './project-view.dto';

export class ProjectPageDto {
  data: ProjectViewDto[];
  pagination?: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}
