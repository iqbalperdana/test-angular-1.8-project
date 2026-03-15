import * as angular from "angular";
import "angular-route";
import { CompanyModule } from "./modules/company/company.module";
import { ProjectModule } from "./modules/project/project.module";

export const appModule = angular.module("projectSearchApp", [
  "ngRoute",
  ProjectModule,
  CompanyModule,
]);

import { APP_CONFIG } from "./app.constants";
appModule.constant("APP_CONFIG", APP_CONFIG);

import "./app.interfaces";

appModule.config([
  "$routeProvider",
  ($routeProvider: angular.route.IRouteProvider) => {
    $routeProvider
      .when("/", {
        template: "<project></project>",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ["projectSearchApp"]);
});
