import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ReleaseSearchFilter } from "../models/release-search/release-search-filter";
import { ReleaseSearchResult } from "../models/release-search/release-search-result";

@Injectable()
export class ReleaseListApiService {

    private apiUrl: string;

    constructor(private httpCLient: HttpClient) {
        this.apiUrl = "https://api.discogs.com";
    }

    search(filter: ReleaseSearchFilter): Promise<ReleaseSearchResult> {
        return this.httpCLient
            .get<ReleaseSearchResult>(`${this.apiUrl}/database/search`, { params: <any>filter })
            .toPromise();
    }


}