import { IMarker } from "../interfaces/IMarker";
import { IMarkerProps } from "../interfaces/IMarkerProps";
import { IMarkerStatusIndex } from "../interfaces/IMarkerStatusIndex";
import { MarkerStatus } from "./MarkerStatusEnum";
import * as d3 from "d3";

export class MarkerHelper {
    static getPointAtPercentage = (pathNode: SVGPathElement, percentage: number) => {
        const length = (pathNode.getTotalLength() / 100) * percentage;
        const svgPoint = pathNode.getPointAtLength(length);
        return [svgPoint.x, svgPoint.y];
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

        best = [best?.x, best?.y];
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
        let position = props.marker.currentPos;

        if (position.length === 0) {
            if (props.marker.isNewPercentage) {
                position = MarkerHelper.getPointAtPercentage(props.line, props.marker.percentage);
            }
        } else {
            if (index.inactive > -1) {
                position = [110, 50 + (30 * (index.inactive))]
            } else if (index.complete > -1) {
                position = [1000, 50 + (30 * (index.complete))]
            }
        }

        return position;
    }

    static onDrag = (props: IMarkerProps, event: any) => {
        if (props.selectedMarker !== undefined && props.marker._id === props.selectedMarker) {
            const node = props.svg;
            const m = d3.pointer(event, node);
  
            const p = MarkerHelper.getClosestPoint(props.line, m);
            let newMarker = {...props.marker};
            newMarker.currentPos = p as number[];
            if (p[0] as number < 101) {
                newMarker.status = MarkerStatus.Inactive;
            } else if (p[0] as number > 1099) {
                newMarker.status = MarkerStatus.Complete
            } else {
                newMarker.status = MarkerStatus.Active
            }
            props.updateMarker(newMarker);
        }
    }

    static onTouch = (props: IMarkerProps, event: any) => {
        if (props.selectedMarker !== undefined && props.marker._id === props.selectedMarker) {
            const node = props.svg;
            const m = d3.pointers(event, node)[0];
  
            const p = MarkerHelper.getClosestPoint(props.line, m);
            let newMarker = {...props.marker};
            newMarker.currentPos = p as number[];
            if (p[0] as number < 101) {
                newMarker.status = MarkerStatus.Inactive;
            } else if (p[0] as number > 1099) {
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
            position: number[],
            drag: (event: any) => void,
            touch: (event: any) => void
        ) => {
        const d3Drag = d3.drag<SVGCircleElement, unknown>().on("drag", drag).touchable(false);
        g.on("touchmove", touch);

        g.attr("transform", "translate(" + position + ")");
        g.append("circle")
            .attr("r", 10)
            .style("fill", props.marker.colour)
            .call(d3Drag);

        if (props.marker._id === props.selectedMarker) {
            g.append("circle")
                .attr("r", 12)
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
            .attr("transform", "translate(" + [-10, -20] + ")")
            .text(props.marker.name);
        }
    }
}
