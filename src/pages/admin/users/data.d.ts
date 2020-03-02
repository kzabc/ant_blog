export interface TableListItem {
  id: number;
  avatar: string;
  name: string;
  email: string;
  nickname: string;
  tags: [];
  login_count: number;
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
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
