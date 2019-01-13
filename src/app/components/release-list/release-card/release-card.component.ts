import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Release } from "src/app/models/release-list/release";

@Component({
    selector: "release-card",
    templateUrl: "release-card.component.html"
})
export class ReleaseCardComponent implements OnInit {
    
    @Input("release")
    release: Release;

    @Output()
    releaseCardClosed = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    get artists(): string {
        if(!this.release || !this.release.artists) {
            return "";
        }
        let artistsRow = this.release.artists.reduce((prevVal, currentVal) => {
            return !prevVal ? currentVal.name : `${prevVal}, ${currentVal.name}`;
        }, "");
        return artistsRow;
    }

    get imageUrl(): string {
        if(!this.release || !this.release.images) {
            return "";
        }
        return this.release.images.length > 0 ?
            this.release.images[0].resource_url : ""; 
    }

    closeReleaseCard() {
        this.releaseCardClosed.emit();
    }
}