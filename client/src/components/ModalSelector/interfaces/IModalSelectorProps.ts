import { IMarker } from "../../Marker/interfaces/IMarker";
import { INewMarker } from "../../Marker/interfaces/INewMarker";

export interface IModalSelectorProps {
    modal: string,
    hillId: string,
    marker: IMarker | undefined,
    add: (marker: INewMarker) => void,
    addButtonRef: React.RefObject<HTMLButtonElement>,
    update: (marker: IMarker) => void,
    updateButtonRef: React.RefObject<HTMLButtonElement>,
    delete: (id: string) => void,
    deleteButtonRef: React.RefObject<HTMLButtonElement>,
    selectModal: (modal: string) => void
}
