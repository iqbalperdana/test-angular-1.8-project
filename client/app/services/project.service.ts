import * as angular from "angular";
import { IApiResponse, IProject } from "../app.interfaces";
import { IProjectService } from "./project.service.interfaces";

export class ProjectService implements IProjectService {
  static $inject = ["$http", "$q", "APP_CONFIG"];

  private baseUrl: string;

  constructor(
    private $http: angular.IHttpService,
    private $q: angular.IQService,
    private APP_CONFIG: any,
  ) {
    this.baseUrl = APP_CONFIG.API_BASE_URL + "/api/projects";
  }

  getProjects(params: any): angular.IPromise<IApiResponse<IProject>> {
    return this.$http
      .get<IApiResponse<IProject>>(this.baseUrl, { params })
      .then((response) => response.data)
      .catch((error) => this.$q.reject(error));
  }
}
