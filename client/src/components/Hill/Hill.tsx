import React from "react";
import Marker from "../Marker/Marker";
import Toolbar from "../Toolbar/Toolbar";
import Modal from "../Modal/Modal";
import { IHillProps } from "./interfaces/IHillProps";
import { IHillState } from "./interfaces/IHillState";
import { IHill } from "./interfaces/IHill";
import { IMarker } from "../Marker/interfaces/IMarker";
import { hillPlaceholder } from "../../util/hillPlaceholder";
import { IMarkerData } from "../../util/IMarkerData";
import * as d3 from "d3";
import "./style/Hill.css";
import { fetchHill, updateHill } from "../../api";

class Hill extends React.Component<IHillProps, IHillState> {
    state = {
        svg: null,
        line: null,
        hill: hillPlaceholder,
        markers: [],
        activeModal: "",
        selectedMarker: {id: "", name:""},
        isMarkerClick: false,
        lastCall: 0
    };

    update = () => {
        const now = +new Date();
        if (now - this.state.lastCall > 100) { //0.05 seconds
            this.setState({ lastCall: now });
            const hill: IHill = {...this.state.hill};
            hill.markers = [...this.state.markers];
            this.props.socket.emit("update-hill-markers", ({room: this.props.id, markers: this.state.markers}));
            updateHill(this.props.id, hill);
        }
    }

    componentDidMount() {
        this.props.socket.emit("hill-connect", this.props.id);
        this.props.socket.on("update-hill-markers", data => this.setState({ markers: data}));
        const line = d3.line().curve(d3.curveCatmullRom);
        const svg: any = d3.select("#hill__svg");
        svg.on("click", this.deselectMarker);
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
        fetchHill(this.props.id)
        .then(res => {
            this.setState({ hill: res.data });
            this.setState({ markers: res.data.markers });
        });
    }

    deselectMarker = () => {
        if (!this.state.isMarkerClick) {
            this.setState({selectedMarker: {id: "", name: ""}});
        }
        this.setState({isMarkerClick: false});
    }

    selectMarker = (marker: IMarkerData) => {
        this.setState({isMarkerClick: true, selectedMarker: marker});
    }
    
    addMarker = (marker: IMarker) => {
        this.setState({markers: [...this.state.markers, marker]}, () => {
            this.update();
        });
        
    }

    updateMarker = (marker: IMarker) => {
        let newMarkers: IMarker[] = [...this.state.markers];
        const index = newMarkers.findIndex(m => m.id === marker.id);
        newMarkers[index] = marker;
        this.setState({markers: newMarkers}, () => {
            this.update();
        });
    }
        
    deleteMarker = (id: string) => {
        let newMarkers: IMarker[] = [...this.state.markers];
        const index = newMarkers.findIndex(m => m.id === id);
        newMarkers.splice(index, 1);
        this.setState({markers: newMarkers}, () => {
            this.update();
        });
    }

    selectModal = (modal: string) => {
        this.setState({activeModal: modal});
    }

    render() {
        return (
            <div className="hill">
                <h1 className="hill__title">{this.state.hill.name}</h1>
                <p className="hill__subtitle">{this.state.hill.description}</p>
                <svg id="hill__svg"
                    width={this.props.size.width}
                    height={this.props.size.height}>
                    {this.state.markers.map((marker: IMarker) => (
                        <Marker svg={this.state.svg}
                                line={this.state.line}
                                marker={marker}
                                markers={this.state.markers}
                                selectedMarker={this.state.selectedMarker}
                                selectMarker={this.selectMarker}
                                updateMarker={this.updateMarker}
                                key={marker.id} />
                    ))}
                </svg>
                <Toolbar markers={this.state.markers} 
                         selectedMarker={this.state.selectedMarker}
                         selectMarker={this.selectMarker}
                         selectModal={this.selectModal} />
                <Modal modal={this.state.activeModal}
                    add={this.addMarker}
                    update={this.updateMarker}
                    delete={this.deleteMarker}
                    marker={this.state.markers.find((m: IMarker) => m.id === this.state.selectedMarker.id)}
                    selectModal={this.selectModal} />
            </div>
        );
    }
}

export default Hill;
