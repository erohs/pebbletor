import { IMarker } from "../../Marker/interfaces/IMarker";

export interface IModalProps {
    modal: string,
    marker: IMarker | undefined,
    add: (marker: IMarker) => void,
    update: (marker: IMarker) => void,
    delete: (id: string) => void,
    selectModal: (modal: string) => void
}