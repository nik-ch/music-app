import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReleaseSearchResult } from "../models/release-list/release-search-result";
import { Release } from "../models/release-list/release";
import { BaseSearchApiservice } from "./common/base-search.apiservice";
import { ReleaseSearchParameters } from "../models/release-list/release-search-parameters";

@Injectable()
export class ReleaseListApiService extends BaseSearchApiservice<ReleaseSearchParameters, ReleaseSearchResult> {

    private apiUrl = "https://api.discogs.com";

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    async getReleaseItem(id: number): Promise<Release> {
        return this.httpClient
            .get<Release>(`${this.apiUrl}/releases/${id}`)
            .toPromise();
    }
}