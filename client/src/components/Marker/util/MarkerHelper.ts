import { ICoord } from "../../../util/ICoord";
import { IMarker } from "../interfaces/IMarker";
import { IMarkerProps } from "../interfaces/IMarkerProps";
import { IMarkerStatusIndex } from "../interfaces/IMarkerStatusIndex";
import { MarkerStatus } from "./MarkerStatusEnum";
import { baseUrl } from "../../../api";
import * as d3 from "d3";

export class MarkerHelper {
    static getPointAtPercentage = (pathNode: SVGPathElement, percentage: number) => {
        const length = (pathNode.getTotalLength() / 100) * percentage;
        const svgPoint = pathNode.getPointAtLength(length);
        return {x: svgPoint.x, y: svgPoint.y};
    }

    static getClosestPoint = (pathNode: SVGPathElement, point: [number, number]) => {
        let pathLength = pathNode.getTotalLength(), precision = 8, best, bestLength = 0, bestDistance = Infinity;

        for (let scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
            if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
                best = scan;
                bestLength = scanLength;
                bestDistance = scanDistance;
            }
        }

        precision /= 2;
        while (precision > 0.5) {
            let before, after, beforeLength, afterLength, beforeDistance, afterDistance;
            if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
                best = before;
                bestLength = beforeLength;
                bestDistance = beforeDistance;
            } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
                best = after;
                bestLength = afterLength;
                bestDistance = afterDistance;
            } else {
                precision /= 2;
            }
        }
        if (best !== undefined ) {
            best = {x: best.x, y: best.y};
        }
        
        return best;

        function distance2(p: { x: number, y: number }) {
            var dx = p.x - point[0],
                dy = p.y - point[1];
            return dx * dx + dy * dy;
        }
    }

    static getStatusIndex = (props: IMarkerProps) => {
        const inactive = props.markers.filter((m: IMarker) => m.status === MarkerStatus.Inactive);
        const inactiveIndex = inactive.findIndex((m: IMarker) => m._id === props.marker._id);
        const complete = props.markers.filter((m: IMarker) => m.status === MarkerStatus.Complete);
        const completeIndex = complete.findIndex((m: IMarker) => m._id === props.marker._id);

        const index: IMarkerStatusIndex = {
            inactive: inactiveIndex,
            complete: completeIndex
        }

        return index;
    }

    static getPosition = (props: IMarkerProps, index: IMarkerStatusIndex) => {
        let position: ICoord = {x: props.marker.x, y: props.marker.y};

        if (position.x === undefined || position.y === undefined) {
            if (props.marker.isNewPercentage) {
                position = MarkerHelper.getPointAtPercentage(props.line, props.marker.percentage);
            }
        } else {
            if (index.inactive > -1) {
                position = {x: 110, y: 50 + (30 * (index.inactive))};
            } else if (index.complete > -1) {
                position = {x: 1000, y: 50 + (30 * (index.complete))};
            }
        }

        return position;
    }

    static stackMarker = (marker: IMarker, markers: IMarker[]) => {
        const newMarker = marker;
        const stackedRange = 30;
        const stackedMarkers = markers.filter(m => m.x >= newMarker.x - stackedRange && m.x <= newMarker.x + stackedRange && m._id !== newMarker._id);
        if (stackedMarkers.length > 0) {
            let y = 0;
            for (let m of stackedMarkers) {
                if (m.y > y) {
                    y = y + 50;
                }
            }
            newMarker.y = newMarker.y - y;
        }

        return newMarker;
    }

    static onDrag = (props: IMarkerProps, event: any) => {
        if (props.selectedMarker !== undefined && props.marker._id === props.selectedMarker) {
            const node = props.svg;
            const m = d3.pointer(event, node);
  
            const p = MarkerHelper.getClosestPoint(props.line, m);
            let newMarker = {...props.marker};
            newMarker.x = p!.x;
            newMarker.y = p!.y;
            if (p!.x < 101) {
                newMarker.status = MarkerStatus.Inactive;
            } else if (p!.x > 1099) {
                newMarker.status = MarkerStatus.Complete
            } else {
                newMarker.status = MarkerStatus.Active
            }

            newMarker = MarkerHelper.stackMarker(newMarker, props.markers);

            props.updateMarker(newMarker);
        }
    }

    static onTouch = (props: IMarkerProps, event: any) => {
        if (props.selectedMarker !== undefined && props.marker._id === props.selectedMarker) {
            const node = props.svg;
            const m = d3.pointers(event, node)[0];
  
            const p = MarkerHelper.getClosestPoint(props.line, m);
            let newMarker = {...props.marker};
            newMarker.x = p!.x;
            newMarker.y = p!.y;
            if (p!.x < 101) {
                newMarker.status = MarkerStatus.Inactive;
            } else if (p!.x > 1099) {
                newMarker.status = MarkerStatus.Complete
            } else {
                newMarker.status = MarkerStatus.Active
            }
            
            props.updateMarker(newMarker);
        }
    }

    static setupMarker = (
            props: IMarkerProps,
            g: d3.Selection<SVGGElement | null, unknown, null, undefined>,
            index: IMarkerStatusIndex,
            position: ICoord,
            drag: (event: any) => void,
            touch: (event: any) => void
        ) => {
        
        g.on("touchmove", touch);

        g.attr("transform", `translate(${[position.x, position.y]})`);
        
        if (props.marker.imagePath !== undefined) {
            const d3Drag = d3.drag<SVGImageElement, unknown>().on("drag", drag).touchable(false);
            g.append("image")
                .attr('width', 26)
                .attr('height', 26)
                .attr("class", "image-marker")
                .attr("transform", "translate(" + [-13, -13] + ")")
                .attr("xlink:href", `${baseUrl}/${props.marker.imagePath}`)
                .attr('preserveAspectRatio', "none")
                .attr("clip-path", "url(#avatar-clip)")
                .call(d3Drag);
        } else {
            const d3Drag = d3.drag<SVGCircleElement, unknown>().on("drag", drag).touchable(false);
            g.append("circle")
                .attr("r", 12)
                .style("fill", props.marker.colour)
                .call(d3Drag);
        }

        if (props.marker._id === props.selectedMarker) {
            g.append("circle")
                .attr("r", 14)
                .attr("class", "selected-marker")
                .style("fill", "none")
                .style("stroke-width", 2);
        }
        
        if (index.inactive > -1 || index.complete > -1) {
            g.append("text")
            .attr("transform", "translate(" + [20, 5] + ")")
            .text(props.marker.name);
        } else {
            g.append("text")
            .attr("transform", "translate(" + [-13, -20] + ")")
            .text(props.marker.name);
        }
    }
}
