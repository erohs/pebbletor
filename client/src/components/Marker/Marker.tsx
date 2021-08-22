import React from "react";
import { IMarkerProps } from "./interfaces/IMarkerProps";
import { MarkerHelper } from "../../util/MarkerHelper";
import * as d3 from "d3";
import "./style/Marker.css";
import { MarkerStatus } from "../../util/MarkerStatusEnum";
import { IMarker } from "./interfaces/IMarker";

class Marker extends React.Component<IMarkerProps> {
    private markerRef = React.createRef<SVGGElement>();
    constructor(props: IMarkerProps) {
        super(props);
        this.drag = this.drag.bind(this);
        this.click = this.click.bind(this);
    }

    drag(event: any) {
        if (this.props.selectedMarker !== undefined && this.props.marker.id === this.props.selectedMarker.id) {
            const node = this.props.svg;
            const m = d3.pointer(event, node);
            const p = MarkerHelper.getClosestPoint(this.props.line, m);
            let newMarker = {...this.props.marker};
            newMarker.currentPos = p as number[];
            if (p[0] as number < 101) {
                newMarker.status = MarkerStatus.Inactive;
            } else if (p[0] as number > 1099) {
                newMarker.status = MarkerStatus.Complete
            } else {
                newMarker.status = MarkerStatus.Active
            }
            this.props.updateMarker(newMarker);
        }
    }

    click() {
        this.props.selectMarker(this.props.marker);
    }

    componentDidMount() {
        const drag = d3.drag<SVGCircleElement, unknown>().on("drag", this.drag);
        let position = this.props.marker.currentPos;
        if (position.length === 0) {
            position = MarkerHelper.getPointAtPercentage(this.props.line, this.props.marker.percentage);
        }

        const inactive = this.props.markers.filter((m: IMarker) => m.status === MarkerStatus.Inactive);
        const inactiveIndex = inactive.findIndex((m: IMarker) => m.id === this.props.marker.id);

        if (inactiveIndex > -1) {
            position = [110, 70 + (50 * (inactiveIndex ))]
        }

        const complete = this.props.markers.filter((m: IMarker) => m.status === MarkerStatus.Complete);
        const completeIndex = complete.findIndex((m: IMarker) => m.id === this.props.marker.id);

        if (completeIndex > -1) {
            position = [1000, 70 + (50 * (completeIndex ))]
        }
        
        let g = d3.select(this.markerRef.current)
        .attr("transform", "translate(" + position + ")");

        g.append("circle")
            .attr("r", 10)
            .style("fill", this.props.marker.colour)
            .call(drag);

        g.append("text")
            .attr("transform", "translate(" + [-10, -20] + ")")
            .text(this.props.marker.name);

        g.on("click", this.click);
    }

    componentDidUpdate() {
        const drag = d3.drag<SVGCircleElement, unknown>().on("drag", this.drag);
        let g = d3.select(this.markerRef.current);

        g.selectAll("text").remove();
        g.selectAll("circle").remove();

        g.append("circle")
                .attr("r", 10)
                .style("fill", this.props.marker.colour)
                .call(drag);

        if (this.props.marker.id === this.props.selectedMarker.id) {
            g.append("circle")
                .attr("r", 12)
                .attr("class", "selected-marker")
                .style("fill", "none")
                .style("stroke-width", 2)
        }

        g.append("text")
            .attr("transform", "translate(" + [-10, -20] + ")")
            .text(this.props.marker.name);

        const inactive = this.props.markers.filter((m: IMarker) => m.status === MarkerStatus.Inactive);
        const inactiveIndex = inactive.findIndex((m: IMarker) => m.id === this.props.marker.id);
        let position = this.props.marker.currentPos;

        if (inactiveIndex > -1) {
            position = [110, 70 + (50 * (inactiveIndex ))]
        }

        const complete = this.props.markers.filter((m: IMarker) => m.status === MarkerStatus.Complete);
        const completeIndex = complete.findIndex((m: IMarker) => m.id === this.props.marker.id);

        if (completeIndex > -1) {
            position = [1000, 70 + (50 * (completeIndex ))]
        }

        if (this.props.marker.currentPos.length !== 0) {
            if (this.props.marker.isNewPercentage) {
                position = MarkerHelper.getPointAtPercentage(this.props.line, this.props.marker.percentage);
            }

            g.attr(
                "transform",
                "translate(" + position + ")"
            );
        }

        this.props.marker.currentPos = position;
        this.props.marker.isNewPercentage = false;
    }

    render() {
        return <g ref={this.markerRef}></g>;
    }
}

export default Marker;
