import { IMarker } from "../../Marker/interfaces/IMarker";

export interface IToolbarProps {
    markers: IMarker[],
    selectedMarker: string,
    hillId: string,
    selectMarker: (id: string) => void,
    add: (marker: FormData) => void,
    update: (id: string, marker: FormData, isNewImage: boolean) => void,
    delete: (id: string) => void,
}
