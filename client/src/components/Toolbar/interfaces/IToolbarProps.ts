import { IMarkerData } from "../../../util/IMarkerData";
import { IMarker } from "../../Marker/interfaces/IMarker";

export interface IToolbarProps {
    markers: IMarker[],
    selectedMarker: IMarkerData,
    selectMarker: (selectedMarker: IMarkerData) => void,
    selectModal: (modal: string) => void,
}