import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('project_area_map')
export class ProjectArea {
  @PrimaryColumn({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'area' })
  area: string;

  @OneToOne(() => Project, (project) => project.projectArea)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
