import * as angular from "angular";
import { CompanyServiceModule } from "./company.service";

export const CompanyModule = angular.module("company", [
  CompanyServiceModule,
]).name;
