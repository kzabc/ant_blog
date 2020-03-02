export interface TableListItem {
  id: number;
  name: string;
  guard_name: number;
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
  KeyWord?:string;
  name?: string;
  pageSize?: number;
  currentPage?: number;
}
