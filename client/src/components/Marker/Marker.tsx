import React from "react";
import { IMarkerProps } from "./interfaces/IMarkerProps";
import { MarkerHelper } from "./util/MarkerHelper";
import { select } from "d3";
import "./style/Marker.css";

class Marker extends React.Component<IMarkerProps> {
    private markerRef = React.createRef<SVGGElement>();

    drag = (event: any) => MarkerHelper.onDrag(this.props, event);

    touch = (event: any) => MarkerHelper.onTouch(this.props, event);

    click = () => this.props.selectMarker(this.props.marker._id);

    componentDidMount() {
        const index = MarkerHelper.getStatusIndex(this.props);
        const position = MarkerHelper.getPosition(this.props, index);
        let g = select(this.markerRef.current);

        g.on("click", this.click);

        MarkerHelper.setupMarker(this.props, g, index, position, this.drag, this.touch);
    }

    componentDidUpdate() {
        const index = MarkerHelper.getStatusIndex(this.props);
        const position = MarkerHelper.getPosition(this.props, index);
        let g = select(this.markerRef.current);

        this.props.marker.currentPos = position;
        this.props.marker.isNewPercentage = false;

        g.selectAll("text").remove();
        g.selectAll("circle").remove();

        MarkerHelper.setupMarker(this.props, g, index, position, this.drag, this.touch);
    }

    render() { return <g ref={this.markerRef} />; }
}

export default Marker;
