import { Track } from "./track";
import { Artist } from "../artist";
import { ReleaseImage } from "./release-image";

export class Release {
    id: number;
    year: number;
    title: string;
    tracklist: Track[];
    artists: Artist[];
    images: ReleaseImage[];
}