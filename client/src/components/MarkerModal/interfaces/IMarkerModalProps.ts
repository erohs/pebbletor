import React from "react";
import { IMarker } from "../../Marker/interfaces/IMarker";

export interface IMarkerModalProps {
    title: string,
    hillId: string,
    marker?: IMarker,
    buttonRef: React.RefObject<HTMLButtonElement>
    add: (marker: FormData) => void,
    update: (id: string, marker: FormData, isNewImage: boolean) => void,
    selectModal: (modal: string) => void
}
