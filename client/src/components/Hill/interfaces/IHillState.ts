import { IMarkerData } from '../../../util/IMarkerData';
import { IMarker } from '../../Marker/interfaces/IMarker';
import { IHill } from './IHill';

export interface IHillState {
    svg: any,
    line: any,
    hill: IHill,
    markers: IMarker[],
    activeModal: string,
    selectedMarker: IMarkerData,
    isMarkerClick: boolean
}
