import { IMarker } from "../components/Marker/interfaces/IMarker";

export let testMarkers: IMarker[] = [
    {
        id: "Marker1",
        name: "Marker 1",
        percentage: 50,
        isNewPercentage: false,
        currentPos: [],
        colour: "blue",
        status: "active"
    },
    {
        id: "Marker2",
        name: "Other marker",
        percentage: 10,
        isNewPercentage: false,
        currentPos: [],
        colour: "red",
        status: "active"
    }
];