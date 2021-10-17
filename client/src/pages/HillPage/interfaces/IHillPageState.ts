import { IHill } from "../../../components/Hill/interfaces/IHill";
import { IMarker } from "../../../components/Marker/interfaces/IMarker";
import { IMarkerData } from "../../../components/Marker/interfaces/IMarkerData";

export interface IHillPageState {
    hill: IHill,
    markers: IMarker[],
    activeModal: string,
    selectedMarker: IMarkerData,
    isMarkerClick: boolean
}
