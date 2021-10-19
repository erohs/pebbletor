import { IMarker } from "../../Marker/interfaces/IMarker";
import { INewMarker } from "../../Marker/interfaces/INewMarker";

export interface IToolbarProps {
    markers: IMarker[],
    selectedMarker: string,
    hillId: string,
    selectMarker: (id: string) => void,
    add: (marker: INewMarker) => void,
    update: (marker: IMarker) => void,
    delete: (id: string) => void,
}
