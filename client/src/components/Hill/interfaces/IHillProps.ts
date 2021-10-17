import { IMarkerData } from "../../../util/IMarkerData";
import { IMarker } from "../../Marker/interfaces/IMarker";
import { IHill } from "./IHill";

export interface IHillProps {
    hill: IHill,
    markers: IMarker[],
    selectedMarker: IMarkerData,
    updateMarker: (marker: IMarker) => void,
    selectMarker: (marker: IMarker) => void,
    deselectMarker: (marker: IMarker) => void,
    size: { width: number, height: number },
    points: Array<Array<number>>
}
