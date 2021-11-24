import React from "react";
import Hill from "../../components/Hill/Hill";
import Toolbar from "../../components/Toolbar/Toolbar";
import { IMarker } from "../../components/Marker/interfaces/IMarker";
import { IHillPageProps } from "./interfaces/IHillPageProps"
import { IHillPageState } from "./interfaces/IHillPageState";
import { hillPlaceholder } from "../../components/Hill/util/hillPlaceholder";
import { createMarker, debounceUpdateMarker, deleteMarker, fetchHill, fetchHillMarkers, updateMarker } from "../../api";
import "./style/HillPage.css";

class HillPage extends React.Component<IHillPageProps, IHillPageState> {
    state = {
        hill: hillPlaceholder,
        markers: [],
        selectedMarker: "",
        isMarkerClick: false
    };

    componentDidMount() {
        this.props.socket.emit("hill-connect", this.props.id);
        this.props.socket.on("update-hill-markers", data => this.setState({ markers: data}));
        fetchHill(this.props.id).then(res => this.setState({ hill: res.data }));
        fetchHillMarkers(this.props.id).then(res => this.setState({ markers: res.data }));
    };

    update = () => this.props.socket.emit("update-hill-markers", ({room: this.props.id, markers: this.state.markers}));

    selectMarker = (id: string) => this.setState({isMarkerClick: true, selectedMarker: id});

    deselectMarker = () => {
        if (!this.state.isMarkerClick) this.setState({selectedMarker: ""});
        this.setState({isMarkerClick: false});
    }

    addMarker = (formData: FormData) => {
        createMarker(formData)
            .then(res => {
                this.setState({markers: [...this.state.markers, res.data]}, () => {
                    this.update();
                });
            });
    }

    updateMarkerWithForm = (id: string, formData: FormData, isNewImage: boolean) => {
        updateMarker(id, formData, isNewImage)
            .then(res => {
                let newMarkers: IMarker[] = [...this.state.markers];
                const index = newMarkers.findIndex(m => m._id === res.data._id);
                newMarkers[index] = res.data;
                this.setState({markers: newMarkers}, () => {
                    this.update();
                });
            })
    }

    updateMarker = (marker: IMarker) => {
        let newMarkers: IMarker[] = [...this.state.markers];
        const index = newMarkers.findIndex(m => m._id === marker._id);
        newMarkers[index] = marker;
        this.setState({markers: newMarkers}, () => {
            this.update();
            debounceUpdateMarker(marker._id, marker);
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

    render() {
        return (
            <>
                <Hill hill={this.state.hill}
                      markers={this.state.markers}
                      selectedMarker={this.state.selectedMarker}
                      updateMarker={this.updateMarker}
                      selectMarker={this.selectMarker}
                      deselectMarker={this.deselectMarker}
                      size={{width: 1200, height: 450}} 
                      points={[[100,400],[300,350],[600,120],[900,350],[1100,400]]} />
                <Toolbar markers={this.state.markers} 
                         selectedMarker={this.state.selectedMarker}
                         hillId={this.props.id}
                         selectMarker={this.selectMarker}
                         add={this.addMarker}
                         update={this.updateMarkerWithForm}
                         delete={this.deleteMarker} />
            </>
        );
    };
};

export default HillPage;
