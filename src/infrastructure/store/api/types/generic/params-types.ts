export interface G_FilterPagination {
  PageNumber?: number;
  PageSize?: number;
}

export interface G_Pagination {
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
