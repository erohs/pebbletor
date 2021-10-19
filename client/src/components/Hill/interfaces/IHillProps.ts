import { IMarker } from "../../Marker/interfaces/IMarker";
import { IHill } from "./IHill";

export interface IHillProps {
    hill: IHill,
    markers: IMarker[],
    selectedMarker: string,
    updateMarker: (marker: IMarker) => void,
    selectMarker: (id: string) => void,
    deselectMarker: (marker: IMarker) => void,
    size: { width: number, height: number },
    points: Array<Array<number>>
}
