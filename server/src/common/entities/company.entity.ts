import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('companies')
export class Company {
  @PrimaryColumn({ name: 'company_id' })
  id: string;

  @Column({ name: 'company_name' })
  name: string;

  @OneToMany(() => Project, (project) => project.company)
  projects: Project[];
}
