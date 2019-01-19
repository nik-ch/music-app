import { ReleaseImageTypeEnum } from "./release-image-type.enum";

export class ReleaseImage {
    resource_url: string;
    width: number;
    height: number;
    type: ReleaseImageTypeEnum;
}