import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { ProjectArea } from './project-area.entity';

@Entity('projects')
export class Project {
  @PrimaryColumn({ name: 'project_id' })
  id: string;

  @Column({ name: 'project_name' })
  name: string;

  @Column({ name: 'project_start' })
  startDate: Date;

  @Column({ name: 'project_end' })
  endDate: Date;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ name: 'project_value' })
  value: number;

  @ManyToOne(() => Company, (company) => company.projects)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => ProjectArea, (projectArea) => projectArea.project)
  @JoinColumn({ name: 'project_id' })
  projectArea: ProjectArea;
}
