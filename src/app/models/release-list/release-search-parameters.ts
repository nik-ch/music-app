import { SearchParameters } from "../common/search-parameters";

export class ReleaseSearchParameters extends SearchParameters {
    constructor() {
        super();
        this.type = "release";
    }
}