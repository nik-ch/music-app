import { ReleaseSearchResultItem } from "./release-search-result-item";
import { BasePagedSearchResult } from "../common/search/base-paged-search-result";

export class ReleaseSearchResult extends BasePagedSearchResult {
    results: ReleaseSearchResultItem[];
}