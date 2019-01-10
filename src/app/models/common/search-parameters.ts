import { BasePagedSearchParameters } from "./base-paged-search-parameters";

export class SearchParameters extends BasePagedSearchParameters {
    type: string;
    title: string;
    release_title: string;
    credit: string;
    artist: string;
    anv: string;
    label: string;
    genre: string;
    style: string;
    country: string;
    year: number;
    format: string;
    catno: string;
    barcode: string;
    track: string;
    submitter: string;
    contributor: string;  
}