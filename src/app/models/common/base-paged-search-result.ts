import { Pagination } from "./pagination/pagination";

export abstract class BasePagedSearchResult {
    pagination: Pagination;
    abstract results: any;
}