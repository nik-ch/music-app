import { Component, OnInit, ViewChild } from "@angular/core";
import { ReleaseListApiService } from "src/app/services/release-list.apiservice";
import { ReleaseSearchResult } from "src/app/models/release-list/release-search-result";
import { ReleaseSearchFilter } from "src/app/models/release-list/release-search-filter";
import { ReleaseSearchResultItem } from "src/app/models/release-list/release-search-result-item";
import { ReleaseCardComponent } from "./release-card/release-card.component";
import { Release } from "src/app/models/release-list/release";

@Component({
    selector: "release-list",
    templateUrl: "./release-list.component.html"
})
export class ReleaseListComponent implements OnInit {

    @ViewChild("releaseCard")
    releaseCard: ReleaseCardComponent;

    releaseList: ReleaseSearchResultItem[];
    selectedRelease: Release;

    private defaultFilter: ReleaseSearchFilter;

    constructor(private releaseListApiService: ReleaseListApiService) {
        this.defaultFilter = new ReleaseSearchFilter("rock", "indie rock", "uk");
    }

    async ngOnInit() {
        let searchResult = await this.releaseListApiService.search(this.defaultFilter);
        this.releaseList = searchResult.results;
    }

    async selectRelease(item: ReleaseSearchResultItem) {
        this.selectedRelease = await this.releaseListApiService.getReleaseItem(item.id);
    }

    onReleaseCardClosed() {
        this.selectedRelease = null;
    }

}