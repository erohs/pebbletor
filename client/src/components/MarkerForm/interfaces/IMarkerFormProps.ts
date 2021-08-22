import { IMarker } from "../../Marker/interfaces/IMarker";

export interface IMarkerFormProps {
    title: string,
    marker?: IMarker,
    add: (marker: IMarker) => void,
    update: (marker: IMarker) => void,
    selectModal: (modal: string) => void
}