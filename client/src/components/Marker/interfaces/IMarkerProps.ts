import { IMarkerData } from "./IMarkerData";
import { IMarker } from "./IMarker";

export interface IMarkerProps {
    svg: any,
    line: any,
    marker: IMarker,
    markers: IMarker[],
    selectedMarker: IMarkerData,
    selectMarker: (marker: IMarker) => void,
    updateMarker: (marker: IMarker) => void
}
