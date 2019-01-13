import { Component, ViewChild } from "@angular/core";
import { ReleaseListApiService } from "src/app/services/release-list.apiservice";
import { ReleaseSearchResultItem } from "src/app/models/release-list/release-search-result-item";
import { ReleaseCardComponent } from "./release-card/release-card.component";
import { Release } from "src/app/models/release-list/release";
import { ReleaseSearchParameters } from "src/app/models/release-list/release-search-parameters";
import { ReleaseSearchResult } from "src/app/models/release-list/release-search-result";
import { SortingCondition } from "src/app/models/common/sorting/sorting-condition";
import { SortingField } from "src/app/models/common/sorting/sorting-field";

@Component({
    selector: "release-list",
    templateUrl: "./release-list.component.html"
})
export class ReleaseListComponent {

    @ViewChild("releaseCard")
    releaseCard: ReleaseCardComponent;

    sortingParameters: SortingCondition;    
    sortingFieldItems: SortingField[];
    searchParameters: ReleaseSearchParameters = new ReleaseSearchParameters();
    releaseList: ReleaseSearchResultItem[] = [];
    selectedRelease: Release;

    constructor(private releaseListApiService: ReleaseListApiService) {
        this.initSearchParams();
        this.initSortFields();
    }

    private initSearchParams() {
        this.searchParameters.country = "uk";
        this.searchParameters.style = "indie rock";
        this.searchParameters.genre = "rock";
    }

    private initSortFields() {
        this.sortingFieldItems = [
            new SortingField("title", "Title"),
            new SortingField("year", "Year")
        ];
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

    onSortingConditionChanged(newCondition: SortingCondition) {
        this.sortingParameters = newCondition;
        this.releaseList = [];
    }
}