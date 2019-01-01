import { Component, OnInit } from "@angular/core";
import { ReleaseListApiService } from "src/app/services/release-list.apiservice";
import { ReleaseSearchResult } from "src/app/models/release-search/release-search-result";
import { ReleaseSearchFilter } from "src/app/models/release-search/release-search-filter";

@Component({
    selector: "release-list",
    templateUrl: "./release-list.component.html"
})
export class ReleaseListComponent implements OnInit {

    searchResult: ReleaseSearchResult;

    private defaultFilter: ReleaseSearchFilter;

    constructor(private releaseListApiService: ReleaseListApiService) {
        this.defaultFilter = new ReleaseSearchFilter("rock", "indie rock", "uk");
    }

    ngOnInit() {
        this.releaseListApiService.search(this.defaultFilter);
    }


}