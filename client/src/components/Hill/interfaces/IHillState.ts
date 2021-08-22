import { IMarker } from '../../Marker/interfaces/IMarker';
import { IHill } from './IHill';

export interface IHillState {
    svg: any,
    line: any,
    hill: IHill,
    markers: IMarker[],
    activeModal: string,
    selectedMarker: {
        id: string,
        name: string
    }
    isMarkerClick: boolean,
    lastCall: number
}
