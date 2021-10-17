import { IMarker } from "../../Marker/interfaces/IMarker";
import { INewMarker } from "../../Marker/interfaces/INewMarker";

export interface IModalProps {
    modal: string,
    hillId: string,
    marker: IMarker | undefined,
    add: (marker: INewMarker) => void,
    update: (marker: IMarker) => void,
    delete: (id: string) => void,
    selectModal: (modal: string) => void
}