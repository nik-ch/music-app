import { Pagination } from "../pagination/pagination";
import { ReleaseSearchResultItem } from "./release-search-result-item";

export class ReleaseSearchResult {
    pagination: Pagination;
    results: ReleaseSearchResultItem[];
}