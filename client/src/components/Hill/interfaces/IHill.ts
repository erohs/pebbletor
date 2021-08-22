import { IMarker } from "../../Marker/interfaces/IMarker";

export interface IHill{
    _id: string,
    name: string,
    description: string,
    author: string,
    markers: IMarker[]
    createdAt: number,
    updatedAt: number
}