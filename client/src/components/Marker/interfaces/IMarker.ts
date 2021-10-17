import { IMarkerData } from "./IMarkerData";
import { INewMarker } from "./INewMarker";

export interface IMarker extends IMarkerData, INewMarker {
    _id: string,
    hillId: string,
    name: string,
    percentage: number,
    isNewPercentage: boolean,
    currentPos: number[],
    colour: string,
    status: string,
    createdAt: number,
    updatedAt: number
}
