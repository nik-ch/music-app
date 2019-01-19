import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Release } from "src/app/models/release-list/release";
import { Track } from "src/app/models/release-list/track";
import { TrackTypeEnum } from "src/app/models/release-list/track-type.enum";
import { ReleaseImageTypeEnum } from "src/app/models/release-list/release-image-type.enum";
import { ReleaseListApiService } from "src/app/services/release-list.apiservice";

@Component({
    selector: "release-card",
    templateUrl: "release-card.component.html"
})
export class ReleaseCardComponent {

    @Output()
    releaseCardClosed = new EventEmitter();

    loadingStarted = false;
    release: Release;
    
    constructor(private releaseListApiService: ReleaseListApiService) {
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

        let primaryImage = this.release.images.find(img => img.type === ReleaseImageTypeEnum.primary);
        if(primaryImage) {
            return primaryImage.resource_url;
        }
        
        return this.release.images.length > 0 ?
            this.release.images[0].resource_url : ""; 
    }

    async load(id: number) {
        this.release = null;
        this.loadingStarted = true;
        this.release = await this.releaseListApiService.getReleaseItem(id);
        this.loadingStarted = false;
    }

    isTrackType(track: Track): boolean {
        return track.type_ === TrackTypeEnum.track;
    }

    isHeadingType(track: Track): boolean {
        return track.type_ === TrackTypeEnum.heading;
    }

    closeReleaseCard() {
        this.release = null;
        this.releaseCardClosed.emit();
    }

}