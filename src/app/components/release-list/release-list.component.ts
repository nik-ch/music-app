import { Component, OnInit, ViewChild } from "@angular/core";
import { ReleaseListApiService } from "src/app/services/release-list.apiservice";
import { ReleaseSearchResultItem } from "src/app/models/release-list/release-search-result-item";
import { ReleaseCardComponent } from "./release-card/release-card.component";
import { Release } from "src/app/models/release-list/release";
import { ReleaseSearchParameters } from "src/app/models/release-list/release-search-parameters";
import { ReleaseSearchResult } from "src/app/models/release-list/release-search-result";

@Component({
    selector: "release-list",
    templateUrl: "./release-list.component.html"
})
export class ReleaseListComponent implements OnInit {

    @ViewChild("releaseCard")
    releaseCard: ReleaseCardComponent;

    searchParameters: ReleaseSearchParameters = new ReleaseSearchParameters();
    releaseList: ReleaseSearchResultItem[] = [];
    selectedRelease: Release;

    constructor(private releaseListApiService: ReleaseListApiService) {
        this.searchParameters.country = "uk";
        this.searchParameters.style = "indie rock";
        this.searchParameters.genre = "rock";
    }

    async ngOnInit() {
    }

    async selectRelease(item: ReleaseSearchResultItem) {
        this.selectedRelease = await this.releaseListApiService.getReleaseItem(item.id);
    }

    onReleaseCardClosed() {
        this.selectedRelease = null;
    }
    
    onDataLoaded(data: ReleaseSearchResult) {
        this.releaseList.push(...data.results);
    }
}