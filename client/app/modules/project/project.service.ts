import * as angular from "angular";
import { IApiResponse } from "../../app.interfaces";
import { IProject } from "./project.intefaces";

export class ProjectService {
  static $inject = ["$http", "$q", "APP_CONFIG"];

  private baseUrl: string;

  constructor(
    private $http: angular.IHttpService,
    private $q: angular.IQService,
    private APP_CONFIG: any,
  ) {
    this.baseUrl = APP_CONFIG.API_BASE_URL + APP_CONFIG.API_ENDPOINTS.PROJECTS;
  }

  getProjects(params: any): angular.IPromise<IApiResponse<IProject>> {
    return this.$http
      .get<IApiResponse<IProject>>(this.baseUrl, { params })
      .then((response) => response.data)
      .catch((error) => this.$q.reject(error));
  }

  getAreas(): angular.IPromise<IApiResponse<string>> {
    return this.$http
      .get<IApiResponse<string>>(this.baseUrl + "/areas")
      .then((response) => response.data)
      .catch((error) => this.$q.reject(error));
  }
}

export const ProjectServiceModule = angular
  .module("project.service", [])
  .service("ProjectService", ProjectService).name;
