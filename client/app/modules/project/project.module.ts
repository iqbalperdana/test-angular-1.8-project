import * as angular from "angular";
import { ProjectComponent } from "./project.component";
import { ProjectController } from "./project.controller";
import { ProjectServiceModule } from "./project.service";

export const ProjectModule = angular
  .module("project", [ProjectServiceModule])
  .controller("ProjectController", ProjectController)
  .component("project", ProjectComponent).name;
