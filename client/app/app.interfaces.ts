export interface IPagination {
  total: number;
  page: string | number;
  perPage: string | number;
  totalPages: number;
}

export interface IPaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface IApiResponse<T> {
  data: T[];
  pagination: IPagination;
}
