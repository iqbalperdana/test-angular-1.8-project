import * as angular from "angular";
import { ProjectServiceModule } from "../../services/project.service";
import { ProjectSearchComponent } from "./project-search.component";
import { ProjectSearchController } from "./project-search.controller";

export const ProjectSearchModule = angular
  .module("projectSearch", [ProjectServiceModule])
  .controller("ProjectSearchController", ProjectSearchController)
  .component("projectSearch", ProjectSearchComponent).name;
