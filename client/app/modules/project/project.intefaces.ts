import { IPagination } from "../../app.interfaces";

export interface ISearchCriteria {
  keyword: string;
  area: string;
  company: string;
}

export interface IProject {
  projectName: string;
  projectStart: string;
  projectEnd: string;
  company: string;
  description: string | null;
  projectValue: number;
  area: string;
}

export interface IProjectsResponse {
  data: IProject[];
  pagination: IPagination;
}
