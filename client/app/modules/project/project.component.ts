import * as angular from "angular";
import { ProjectController } from "./project.controller";
import template from "./project.template.html";

export const ProjectComponent: angular.IComponentOptions = {
  template,
  controller: ProjectController,
  controllerAs: "$ctrl",
};
