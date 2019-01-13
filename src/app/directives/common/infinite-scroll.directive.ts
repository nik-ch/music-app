import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { BasePagedSearchResult } from "src/app/models/common/search/base-paged-search-result";
import { BaseSearchApiservice } from "src/app/services/common/base-search.apiservice";
import { BaseSearchParameters } from "src/app/models/common/search/base-search-parameters";
import { SortingCondition } from "src/app/models/common/sorting/sorting-condition";

@Directive({
    selector: "[infiniteScroll]"
})
export class InfiniteScrollDirective
    <TSearchParams extends BaseSearchParameters, TSearchResult extends BasePagedSearchResult> implements OnInit, OnChanges {

    @Input("apiSearchService")
    apiSearchService: BaseSearchApiservice<TSearchParams, TSearchResult>;

    @Input("searchParams")
    searchParams: TSearchParams;

    @Input("initLoadRequired")
    initLoadRequired: boolean;

    @Input("itemsPerPage")
    itemsPerPage: number;

    private _startLoadingPercent = 80;

    @Input("startLoadingPercent")
    set startLoadingPercent(percent: number) {
        if(percent >= 0 && percent <= 100) {
            this._startLoadingPercent = percent;
        }
    }

    @Input("sortingParams")
    sortingParams: SortingCondition;

    @Output()
    dataLoaded = new EventEmitter<TSearchResult>();

    private currentPage = 1;
    private totalPagesCount = 0;
    private isLoading = false;

    constructor(private el: ElementRef) {
    }

    async ngOnInit() {
        if (this.initLoadRequired) {
            await this.load();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes && changes.sortingParams) {
            this.currentPage = 1;
            this.totalPagesCount = 0;
            this.load();
        }
    }

    async load() {
        this.isLoading = true;

        this.searchParams.page = this.currentPage;
        this.searchParams.per_page = this.itemsPerPage;
        this.searchParams.sort = this.sortingParams && this.sortingParams.sortingField 
            ? this.sortingParams.sortingField.field : null;
        this.searchParams.sort_order = this.sortingParams ? this.sortingParams.sortingOrder : null;
        
        let data = await this.apiSearchService.search(this.searchParams)
        this.currentPage++;
        this.totalPagesCount = data.pagination.pages;
        this.dataLoaded.emit(data);
        this.isLoading = false;
    }

    @HostListener("scroll") onscroll() {
        if(!this.isLoading
            && this.currentPage < this.totalPagesCount
            && this.checkScrollHeightCondition) {
            this.load();
        }
    }

    private get checkScrollHeightCondition(): boolean {
        return this.el.nativeElement.scrollTop + this.el.nativeElement.clientHeight 
            >= this.el.nativeElement.scrollHeight * this._startLoadingPercent / 100;
    } 
}