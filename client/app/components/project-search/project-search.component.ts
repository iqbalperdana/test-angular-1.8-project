import * as angular from "angular";
import { ProjectSearchController } from "./project-search.controller";
import template from "./project-search.template.html";

export const ProjectSearchComponent: angular.IComponentOptions = {
  template,
  controller: ProjectSearchController,
  controllerAs: "$ctrl",
};
