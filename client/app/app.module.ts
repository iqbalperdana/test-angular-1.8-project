import * as angular from "angular";
import "angular-route";
import { ProjectSearchModule } from "./components/project-search/project-search.module";

export const appModule = angular.module("projectSearchApp", [
  "ngRoute",
  ProjectSearchModule,
]);

import { APP_CONFIG } from "./app.constants";
appModule.constant("APP_CONFIG", APP_CONFIG);

import "./app.interfaces";

appModule.config([
  "$routeProvider",
  ($routeProvider: angular.route.IRouteProvider) => {
    $routeProvider
      .when("/", {
        template: "<project-search></project-search>",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ["projectSearchApp"]);
});
