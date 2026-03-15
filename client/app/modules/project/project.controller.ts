import * as angular from "angular";
import { IApiResponse, IPaginationState } from "../../app.interfaces";
import { ICompany } from "../company/company.intefaces";
import { CompanyService } from "../company/company.service";
import { IProject, ISearchCriteria } from "./project.intefaces";
import { ProjectService } from "./project.service";

export class ProjectController implements angular.IController {
  static $inject = ["ProjectService", "CompanyService", "$scope"];

  searchCriteria: ISearchCriteria;
  projects: IProject[] = [];
  totalProjects: number = 0;
  loading: boolean = false;
  error: string | null = null;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  areas: string[] = [
    "Manchester",
    "London",
    "Birmingham",
    "Leeds",
    "Liverpool",
  ];
  companies: string[] = ["sss", "ccc", "erw"];
  debug: boolean = true;

  pagination: IPaginationState = {
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
  };

  private searchTimeout: any;

  constructor(
    private ProjectService: ProjectService,
    private CompanyService: CompanyService,
    private $scope: angular.IScope,
  ) {
    this.searchCriteria = {
      keyword: "",
      area: "",
      company: "",
    };
  }

  $onInit(): void {
    this.getAllCompanies();
    this.searchProjects();
  }

  private buildQueryParams(): any {
    const params: any = {
      page: this.pagination.currentPage,
      per_page: this.pagination.itemsPerPage,
    };

    if (this.searchCriteria.keyword) {
      params.keyword = this.searchCriteria.keyword;
    }
    if (this.searchCriteria.area) {
      params.area = this.searchCriteria.area;
    }
    if (this.searchCriteria.company) {
      params.company = this.searchCriteria.company;
    }

    return params;
  }

  searchProjects(): void {
    this.loading = true;
    this.error = null;

    const params = this.buildQueryParams();

    this.ProjectService.getProjects(params)
      .then((response: IApiResponse<IProject>) => {
        this.projects = response.data || [];

        if (response.pagination) {
          this.totalProjects = response.pagination.total || 0;
          this.pagination.totalPages = response.pagination.totalPages || 1;
          this.pagination.currentPage =
            parseInt(response.pagination.page as string) || 1;
          this.pagination.itemsPerPage =
            parseInt(response.pagination.perPage as string) ||
            this.pagination.itemsPerPage;
        }
      })
      .catch((error: any) => {
        this.error = "Failed to load projects. Please try again.";
        console.error("Error loading projects:", error);
      })
      .finally(() => {
        this.loading = false;
        this.$scope.$applyAsync();
      });
  }

  clearFilters(): void {
    this.searchCriteria = {
      keyword: "",
      area: "",
      company: "",
    };
    this.pagination.currentPage = 1;
    this.searchProjects();
  }

  changePageSize(): void {
    this.pagination.currentPage = 1;
    this.searchProjects();

    localStorage.setItem(
      "itemsPerPage",
      this.pagination.itemsPerPage.toString(),
    );
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pagination.totalPages) return;
    this.pagination.currentPage = page;
    this.searchProjects();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.pagination.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  getAllCompanies(): void {
    this.loading = true;
    this.error = null;

    this.CompanyService.getCompanies()
      .then((response: IApiResponse<ICompany>) => {
        this.companies = response.data.map((company: ICompany) => company.name);
        console.log(this.companies);
      })
      .catch((error: any) => {
        this.error = "Failed to load companies. Please try again.";
        console.error("Error loading companies:", error);
      })
      .finally(() => {
        this.loading = false;
        this.$scope.$applyAsync();
      });
  }
}
