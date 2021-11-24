import Marker from "../Marker/Marker";
import { useEffect, useState } from "react";
import { IHillProps } from "./interfaces/IHillProps";
import { IMarker } from "../Marker/interfaces/IMarker";
import * as d3 from "d3";
import "./style/Hill.css";

function Hill(props: IHillProps){
    const [svg, setSvg] = useState(null);
    const [line, setLine] = useState(null);

    useEffect(() => {
        const line = d3.line().curve(d3.curveCatmullRom);
        const svg: any = d3.select("#hill__svg");
        svg.on("click", props.deselectMarker);
        
        const defs = svg.append("defs");
        defs.append("clipPath")
            .attr("id", "avatar-clip")
            .append("circle")
            .attr("cx", 13)
            .attr("cy", 13)
            .attr("r", 12)

        const path = svg
            .append("path")
            .datum(props.points)
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
        
        setSvg(svg.node());
        setLine(path.node());
    }, []);

    return (
        <div className="hill">
            <h1 className="hill__title">{props.hill.name}</h1>
            <p className="hill__subtitle">{props.hill.description}</p>
            <svg id="hill__svg"
                width={props.size.width}
                height={props.size.height}>
                {props.markers.map((marker: IMarker) => (
                    <Marker svg={svg}
                            line={line}
                            marker={marker}
                            markers={props.markers}
                            selectedMarker={props.selectedMarker}
                            selectMarker={props.selectMarker}
                            updateMarker={props.updateMarker}
                            key={marker._id} />
                ))}
            </svg>
        </div>
    );
}

export default Hill;
