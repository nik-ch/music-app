import { BasePagedSearchResult } from "src/app/models/common/search/base-paged-search-result";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseSearchParameters } from "src/app/models/common/search/base-search-parameters";

export abstract class BaseSearchApiservice
    <TSearchParams extends BaseSearchParameters, TSearchResult extends BasePagedSearchResult> {
    
    private searchUrl = "https://api.discogs.com/database/search";

    constructor(protected httpClient: HttpClient) {
    }

    async search(searchParameters: TSearchParams): Promise<TSearchResult> {
        let params = this.createHttpParams(searchParameters);
        return this.httpClient.get<TSearchResult>(this.searchUrl, { params }).toPromise();
    }

    private createHttpParams(searchParameters: TSearchParams): HttpParams {
        let params = new HttpParams();
        Object.keys(searchParameters).forEach(key => {
            if(searchParameters[key] != null) {
                params = params.set(key, searchParameters[key]);
            }
        });
        return params;
    }
}