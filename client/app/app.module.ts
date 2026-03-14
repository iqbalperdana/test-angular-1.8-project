import * as angular from "angular";
import "angular-route";

// Create module first
export const appModule = angular.module("projectSearchApp", ["ngRoute"]);

import { APP_CONFIG } from "./app.constants";
appModule.constant("APP_CONFIG", APP_CONFIG);

// Import interfaces (these don't cause issues)
import "./app.interfaces";

// ✅ FIX: Import services AFTER they're registered? No - let's try a different approach
// Instead of importing the files that register themselves,
// import the classes and register them here explicitly

import { ProjectService } from "./services/project.service";
appModule.service("ProjectService", ProjectService);

import { ProjectSearchController } from "./components/project-search/project-search.controller";
appModule.controller("ProjectSearchController", ProjectSearchController);

import { ProjectSearchComponent } from "./components/project-search/project-search.component";
appModule.component("projectSearch", ProjectSearchComponent);

// Configure routes
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
