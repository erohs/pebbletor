import { IMarker } from "./IMarker";

export interface IMarkerProps {
    svg: any,
    line: any,
    marker: IMarker,
    markers: IMarker[],
    selectedMarker: string,
    selectMarker: (id: string) => void,
    updateMarker: (marker: IMarker) => void
}
