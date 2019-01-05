import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ReleaseSearchFilter } from "../models/release-list/release-search-filter";
import { ReleaseSearchResult } from "../models/release-list/release-search-result";
import { Release } from "../models/release-list/release";

@Injectable()
export class ReleaseListApiService {

    private apiUrl: string;

    constructor(private httpCLient: HttpClient) {
        this.apiUrl = "https://api.discogs.com";
    }

    async search(filter: ReleaseSearchFilter): Promise<ReleaseSearchResult> {
        return this.httpCLient
            .get<ReleaseSearchResult>(`${this.apiUrl}/database/search`, { params: <any>filter })
            .toPromise();
    }

    async getReleaseItem(id: number): Promise<Release> {
        return this.httpCLient
            .get<Release>(`${this.apiUrl}/releases/${id}`)
            .toPromise();
    }


}