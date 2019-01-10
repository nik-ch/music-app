import { ReleaseSearchResultItem } from "./release-search-result-item";
import { BasePagedSearchResult } from "../common/base-paged-search-result";

export class ReleaseSearchResult extends BasePagedSearchResult {
    results: ReleaseSearchResultItem[];
}