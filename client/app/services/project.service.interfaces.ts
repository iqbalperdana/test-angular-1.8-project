import * as angular from "angular";
import { IApiResponse, IProject } from "../app.interfaces";

export interface IProjectService {
  getProjects(params: any): angular.IPromise<IApiResponse<IProject>>;
}

export type ProjectServiceConstructor = (
  $http: angular.IHttpService,
  $q: angular.IQService,
) => IProjectService;
