export type TQueryParams = {
    name: string,
    value: boolean | React.Key
}

export type TQueryInitialState = {
    searchTerm: string;
    sort: string;
    filters: string[];
  };