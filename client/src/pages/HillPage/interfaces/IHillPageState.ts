import { IHill } from "../../../components/Hill/interfaces/IHill";
import { IMarker } from "../../../components/Marker/interfaces/IMarker";

export interface IHillPageState {
    hill: IHill,
    markers: IMarker[],
    selectedMarker: string,
    isMarkerClick: boolean
}
