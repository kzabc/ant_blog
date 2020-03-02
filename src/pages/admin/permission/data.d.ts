export interface TableListItem {
  id: number;
  name: string;
  guard_name: string;
  updated_at: Date;
  created_at: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  name?: string;
  pageSize?: number;
  currentPage?: number;
}
