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

export interface IPagination {
  total: number;
  page: string | number;
  perPage: string | number;
  totalPages: number;
}

export interface ISearchCriteria {
  keyword: string;
  area: string;
  company: string;
}

export interface IPaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface IApiResponse<T> {
  data: T[];
  pagination: IPagination;
}
