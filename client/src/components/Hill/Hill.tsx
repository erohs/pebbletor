import React from "react";
import Marker from "../Marker/Marker";
import { IHillProps } from "./interfaces/IHillProps";
import { IHillState } from "./interfaces/IHillState";
import { IMarker } from "../Marker/interfaces/IMarker";
import * as d3 from "d3";
import "./style/Hill.css";

class Hill extends React.Component<IHillProps, IHillState> {
    state = {
        svg: null,
        line: null
    };

    componentDidMount() {
        const line = d3.line().curve(d3.curveCatmullRom);
        const svg: any = d3.select("#hill__svg");
        const defs = svg.append("defs");
        defs.append("clipPath")
            .attr("id", "avatar-clip")
            .append("circle")
            .attr("cx", 13)
            .attr("cy", 13)
            .attr("r", 12)
        svg.on("click", this.props.deselectMarker);
        const path = svg
            .append("path")
            .datum(this.props.points)
            .attr("d", line)
            .attr("id", "hill__path");

        svg.append("path")
            .datum([[600, 400],[600, 120]])
            .attr("d", d3.line())
            .attr("class", "hill__line");

        svg.append("text")
        .attr("transform", "translate(" + [100, 20] + ")")
        .attr("class", "hill__text")
        .text("Inactive");

        svg.append("text")
        .attr("transform", "translate(" + [990, 20] + ")")
        .attr("class", "hill__text")
        .text("Complete");
        
        this.setState({ svg: svg.node(), line: path.node() });
    }

    render() {
        return (
            <div className="hill">
                <h1 className="hill__title">{this.props.hill.name}</h1>
                <p className="hill__subtitle">{this.props.hill.description}</p>
                <svg id="hill__svg"
                    width={this.props.size.width}
                    height={this.props.size.height}>
                    {this.props.markers.map((marker: IMarker) => (
                        <Marker svg={this.state.svg}
                                line={this.state.line}
                                marker={marker}
                                markers={this.props.markers}
                                selectedMarker={this.props.selectedMarker}
                                selectMarker={this.props.selectMarker}
                                updateMarker={this.props.updateMarker}
                                key={marker._id} />
                    ))}
                </svg>
            </div>
        );
    }
}

export default Hill;
