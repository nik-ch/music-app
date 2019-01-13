import { IPagedSearchParameters } from "./paged-search-parameters.interface";
import { ISortingSearchParameters } from "./sorting-search-parameters.interface";

export abstract class BaseSearchParameters implements IPagedSearchParameters, ISortingSearchParameters {
    sort: string;
    sort_order: string;
    page: number;    
    per_page: number;
}