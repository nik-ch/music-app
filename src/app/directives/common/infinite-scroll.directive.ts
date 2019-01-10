import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { BasePagedSearchParameters } from "src/app/models/common/base-paged-search-parameters";
import { BasePagedSearchResult } from "src/app/models/common/base-paged-search-result";
import { BasePagedSearchApiservice } from "src/app/services/common/base-paged-search.apiservice";

@Directive({
    selector: "[infiniteScroll]"
})
export class InfiniteScrollDirective
    <TSearchParams extends BasePagedSearchParameters, TSearchResult extends BasePagedSearchResult> implements OnInit {

    @Input("apiSearchService")
    apiSearchService: BasePagedSearchApiservice<TSearchParams, TSearchResult>;

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

    async load() {
        this.isLoading = true;
        this.searchParams.page = this.currentPage;
        if (this.itemsPerPage) {
            this.searchParams.per_page = this.itemsPerPage;
        }
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