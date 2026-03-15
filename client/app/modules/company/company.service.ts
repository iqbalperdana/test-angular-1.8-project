import * as angular from "angular";
import { IApiResponse } from "../../app.interfaces";
import { ICompany } from "./company.intefaces";

export class CompanyService {
  static $inject = ["$http", "$q", "APP_CONFIG"];

  private baseUrl: string;

  constructor(
    private $http: angular.IHttpService,
    private $q: angular.IQService,
    private APP_CONFIG: any,
  ) {
    this.baseUrl = APP_CONFIG.API_BASE_URL + APP_CONFIG.API_ENDPOINTS.COMPANIES;
  }

  getCompanies(): angular.IPromise<IApiResponse<ICompany>> {
    return this.$http
      .get<IApiResponse<ICompany>>(this.baseUrl)
      .then((response) => response.data)
      .catch((error) => this.$q.reject(error));
  }
}

export const CompanyServiceModule = angular
  .module("company.service", [])
  .service("CompanyService", CompanyService).name;
