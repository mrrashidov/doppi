type TablePropsActionsType = {
  show?: boolean;
  edit?: boolean;
  duplicate?: boolean;
  archive?: boolean;
  move?: boolean;
  share?: boolean;
  favorite?: boolean;
  delete?: boolean;
};
export type TablePropsFieldsType = {
  key?: string | undefined;
  label?: string | undefined;
  sort?: string | undefined;
};

export type TablePropsFilter = boolean | undefined;
export type TablePropsPagination = boolean | undefined;
export type TablePropsLoading = boolean | undefined;
export type TablePropsSortable = boolean | undefined;
export type TablePropsTableKey = string | undefined;
export type TablePropFields = TablePropsFieldsType | string[];
export type TablePropActions = TablePropsActionsType | boolean | undefined;
export type TablePropItems = any[];
export interface useTableInterface {
  fields: TablePropFields;
  items: TablePropItems;
  actions: TablePropActions;
  filter: TablePropsFilter;
  sortable: TablePropsSortable;
  pagination: TablePropsPagination;
  tableKey: TablePropsTableKey;
  loading: TablePropsLoading;
}
