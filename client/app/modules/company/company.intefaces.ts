import { IPagination } from "../../app.interfaces";

export interface ICompany {
  id: string;
  name: string;
}

export interface ICompaniesResponse {
  data: ICompany[];
  pagination: IPagination;
}
