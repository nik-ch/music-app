import { BasePagedSearchResult } from "src/app/models/common/base-paged-search-result";
import { HttpClient } from "@angular/common/http";
import { BasePagedSearchParameters } from "src/app/models/common/base-paged-search-parameters";

export abstract class BasePagedSearchApiservice
    <TSearchParams extends BasePagedSearchParameters, TSearchResult extends BasePagedSearchResult> {
    
    private searchUrl = "https://api.discogs.com/database/search";

    constructor(protected httpClient: HttpClient) {
    }

    async search(searchParameters: TSearchParams): Promise<TSearchResult> {
        return this.httpClient.get<TSearchResult>(this.searchUrl, { params: <any>searchParameters }).toPromise();
    }
}