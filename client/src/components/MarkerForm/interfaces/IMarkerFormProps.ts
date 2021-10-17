import { IMarker } from "../../Marker/interfaces/IMarker";
import { INewMarker } from "../../Marker/interfaces/INewMarker";

export interface IMarkerFormProps {
    title: string,
    hillId: string,
    marker?: IMarker,
    add: (marker: INewMarker) => void,
    update: (marker: IMarker) => void,
    selectModal: (modal: string) => void
}