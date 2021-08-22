import { IMarkerData } from "../../../util/IMarkerData";

export interface IMarker extends IMarkerData {
    id: string,
    name: string,
    percentage: number,
    isNewPercentage: boolean,
    currentPos: number[],
    colour: string,
    status: string
}