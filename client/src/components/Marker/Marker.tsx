import React from "react";
import { IMarker } from "./interfaces/IMarker";
import { IMarkerProps } from "./interfaces/IMarkerProps";
import { MarkerHelper } from "./util/MarkerHelper";
import { MarkerStatus } from "./util/MarkerStatusEnum";
import * as d3 from "d3";
import "./style/Marker.css";

class Marker extends React.Component<IMarkerProps> {
    private markerRef = React.createRef<SVGGElement>();
    constructor(props: IMarkerProps) {
        super(props);
        this.drag = this.drag.bind(this);
        this.click = this.click.bind(this);
    }

    drag = (event: any) => {
        if (this.props.selectedMarker !== undefined && this.props.marker._id === this.props.selectedMarker) {
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

    click = () => this.props.selectMarker(this.props.marker._id);

    componentDidMount() {
        const inactive = this.props.markers.filter((m: IMarker) => m.status === MarkerStatus.Inactive);
        const inactiveIndex = inactive.findIndex((m: IMarker) => m._id === this.props.marker._id);
        const complete = this.props.markers.filter((m: IMarker) => m.status === MarkerStatus.Complete);
        const completeIndex = complete.findIndex((m: IMarker) => m._id === this.props.marker._id);
        let position = this.props.marker.currentPos;

        if (inactiveIndex > -1) {
            position = [110, 50 + (30 * (inactiveIndex))]
        }

        if (completeIndex > -1) {
            position = [1000, 50 + (30 * (completeIndex))]
        }

        if (position.length === 0) {
            position = MarkerHelper.getPointAtPercentage(this.props.line, this.props.marker.percentage);
        }

        const drag = d3.drag<SVGCircleElement, unknown>().on("drag", this.drag);
        let g = d3.select(this.markerRef.current)
            .attr("transform", "translate(" + position + ")");

        g.append("circle")
            .attr("r", 10)
            .style("fill", this.props.marker.colour)
            .call(drag);

        if (inactiveIndex > -1 || completeIndex > -1) {
            g.append("text")
            .attr("transform", "translate(" + [20, 5] + ")")
            .text(this.props.marker.name);
        } else {
            g.append("text")
            .attr("transform", "translate(" + [-10, -20] + ")")
            .text(this.props.marker.name);
        }

        g.on("click", this.click);
    }

    componentDidUpdate() {
        const inactive = this.props.markers.filter((m: IMarker) => m.status === MarkerStatus.Inactive);
        const inactiveIndex = inactive.findIndex((m: IMarker) => m._id === this.props.marker._id);
        const complete = this.props.markers.filter((m: IMarker) => m.status === MarkerStatus.Complete);
        const completeIndex = complete.findIndex((m: IMarker) => m._id === this.props.marker._id);
        let position = this.props.marker.currentPos;

        if (inactiveIndex > -1) {
            position = [110, 50 + (30 * (inactiveIndex ))]
        }

        if (completeIndex > -1) {
            position = [1000, 50 + (30 * (completeIndex ))]
        }

        if (position.length === 0) {
            if (this.props.marker.isNewPercentage) {
                position = MarkerHelper.getPointAtPercentage(this.props.line, this.props.marker.percentage);
            }
        }

        this.props.marker.currentPos = position;
        this.props.marker.isNewPercentage = false;

        const drag = d3.drag<SVGCircleElement, unknown>().on("drag", this.drag);
        let g = d3.select(this.markerRef.current)
            .attr("transform", "translate(" + position + ")");
        
        g.selectAll("text").remove();
        g.selectAll("circle").remove();

        g.append("circle")
            .attr("r", 10)
            .style("fill", this.props.marker.colour)
            .call(drag);

        if (this.props.marker._id === this.props.selectedMarker) {
            g.append("circle")
                .attr("r", 12)
                .attr("class", "selected-marker")
                .style("fill", "none")
                .style("stroke-width", 2);
        }
        
        if (inactiveIndex > -1 || completeIndex > -1) {
            g.append("text")
            .attr("transform", "translate(" + [20, 5] + ")")
            .text(this.props.marker.name);
        } else {
            g.append("text")
            .attr("transform", "translate(" + [-10, -20] + ")")
            .text(this.props.marker.name);
        }
    }

    render() {
        return <g ref={this.markerRef}></g>;
    }
}

export default Marker;
