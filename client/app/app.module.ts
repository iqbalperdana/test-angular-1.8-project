import * as angular from "angular";
import "angular-route";

console.log("Angular imported:", angular); // Should show the angular object
console.log("Angular.module exists:", typeof angular.module); // Should be 'function'

export const appModule = angular.module("projectSearchApp", ["ngRoute"]);

import { APP_CONFIG } from "./app.constants";
appModule.constant("APP_CONFIG", APP_CONFIG);

import "./app.interfaces";

import { ProjectService } from "./services/project.service";
appModule.service("ProjectService", ProjectService);

import { ProjectSearchController } from "./components/project-search/project-search.controller";
appModule.controller("ProjectSearchController", ProjectSearchController);

import { ProjectSearchComponent } from "./components/project-search/project-search.component";
appModule.component("projectSearch", ProjectSearchComponent);

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
