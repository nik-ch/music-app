import { SearchParameters } from "../common/search/search-parameters";

export class ReleaseSearchParameters extends SearchParameters {
    constructor() {
        super();
        this.type = "release";
    }
}