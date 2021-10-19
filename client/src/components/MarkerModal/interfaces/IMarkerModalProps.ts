import React from "react";
import { IMarker } from "../../Marker/interfaces/IMarker";
import { INewMarker } from "../../Marker/interfaces/INewMarker";

export interface IMarkerModalProps {
    title: string,
    hillId: string,
    marker?: IMarker,
    buttonRef: React.RefObject<HTMLButtonElement>
    add: (marker: INewMarker) => void,
    update: (marker: IMarker) => void,
    selectModal: (modal: string) => void
}
