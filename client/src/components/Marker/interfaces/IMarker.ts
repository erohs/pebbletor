import { INewMarker } from "./INewMarker";

export interface IMarker extends INewMarker {
    _id: string,
    hillId: string,
    name: string,
    percentage: number,
    isNewPercentage: boolean,
    x: number,
    y: number,
    imagePath: string,
    colour: string,
    status: string,
    createdAt: number,
    updatedAt: number
}
