import { IMarker } from "../../Marker/interfaces/IMarker";

export interface IModalSelectorProps {
    modal: string,
    hillId: string,
    marker: IMarker | undefined,
    add: (marker: FormData) => void,
    addButtonRef: React.RefObject<HTMLButtonElement>,
    update: (id: string, marker: FormData, isNewImage: boolean) => void,
    updateButtonRef: React.RefObject<HTMLButtonElement>,
    delete: (id: string) => void,
    deleteButtonRef: React.RefObject<HTMLButtonElement>,
    selectModal: (modal: string) => void
}
