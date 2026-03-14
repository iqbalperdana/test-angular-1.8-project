import { IApiResponse, IProject } from "../app.interfaces";

export interface IProjectService {
  getProjects(params: any): angular.IPromise<IApiResponse<IProject>>;
}

// Type for service constructor
export type ProjectServiceConstructor = (
  $http: angular.IHttpService,
  $q: angular.IQService,
) => IProjectService;
