import React from "react";
import Marker from "../Marker/Marker";
import Toolbar from "../Toolbar/Toolbar";
import Modal from "../Modal/Modal";
import { IHillProps } from "./interfaces/IHillProps";
import { IHillState } from "./interfaces/IHillState";
import { IMarker } from "../Marker/interfaces/IMarker";
import { hillPlaceholder } from "../../util/hillPlaceholder";
import { IMarkerData } from "../../util/IMarkerData";
import { createMarker, deleteMarker, fetchHill, fetchHillMarkers, debounceUpdateMarker } from "../../api";
import { INewMarker } from "../Marker/interfaces/INewMarker";
import * as d3 from "d3";
import "./style/Hill.css";

class Hill extends React.Component<IHillProps, IHillState> {
    state = {
        svg: null,
        line: null,
        hill: hillPlaceholder,
        markers: [],
        activeModal: "",
        selectedMarker: {_id: "", name:""},
        isMarkerClick: false
    };

    update = () => this.props.socket.emit("update-hill-markers", ({room: this.props.id, markers: this.state.markers}));

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
        fetchHill(this.props.id).then(res => this.setState({ hill: res.data }));
        fetchHillMarkers(this.props.id).then(res => this.setState({ markers: res.data }));
    }

    deselectMarker = () => {
        if (!this.state.isMarkerClick) {
            this.setState({selectedMarker: {_id: "", name: ""}});
        }
        this.setState({isMarkerClick: false});
    }

    selectMarker = (marker: IMarkerData) => {
        this.setState({isMarkerClick: true, selectedMarker: marker});
    }
    
    addMarker = (marker: INewMarker) => {
        createMarker(marker)
            .then((res) => {
                this.setState({markers: [...this.state.markers, res.data]}, () => {
                    this.update();
                });
            });
    }

    updateMarker = (marker: IMarker) => {
        let newMarkers: IMarker[] = [...this.state.markers];
        const index = newMarkers.findIndex(m => m._id === marker._id);
        newMarkers[index] = marker;
        this.setState({markers: newMarkers}, () => {
            this.update();
            debounceUpdateMarker(marker._id, marker)
        });
    }
        
    deleteMarker = (id: string) => {
        let newMarkers: IMarker[] = [...this.state.markers];
        const index = newMarkers.findIndex(m => m._id === id);
        newMarkers.splice(index, 1);
        this.setState({markers: newMarkers}, () => {
            this.update();
            deleteMarker(id);
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
                                key={marker._id} />
                    ))}
                </svg>
                <Toolbar markers={this.state.markers} 
                         selectedMarker={this.state.selectedMarker}
                         selectMarker={this.selectMarker}
                         selectModal={this.selectModal} />
                <Modal modal={this.state.activeModal}
                    hillId={this.props.id}
                    add={this.addMarker}
                    update={this.updateMarker}
                    delete={this.deleteMarker}
                    marker={this.state.markers.find((m: IMarker) => m._id === this.state.selectedMarker._id)}
                    selectModal={this.selectModal} />
            </div>
        );
    }
}

export default Hill;
