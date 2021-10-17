import React from "react";
import Hill from "../../components/Hill/Hill";
import Modal from "../../components/Modal/Modal";
import Toolbar from "../../components/Toolbar/Toolbar";
import { IMarker } from "../../components/Marker/interfaces/IMarker";
import { INewMarker } from "../../components/Marker/interfaces/INewMarker";
import { IMarkerData } from "../../util/IMarkerData";
import { IHillPageProps } from "./interfaces/IHillPageProps"
import { IHillPageState } from "./interfaces/IHillPageState";
import { hillPlaceholder } from "../../util/hillPlaceholder";
import { createMarker, debounceUpdateMarker, deleteMarker, fetchHill, fetchHillMarkers } from "../../api";
import "./style/HillPage.css";

class HillPage extends React.Component<IHillPageProps, IHillPageState> {
    state = {
        hill: hillPlaceholder,
        markers: [],
        activeModal: "",
        selectedMarker: {_id: "", name:""},
        isMarkerClick: false
    };

    componentDidMount() {
        this.props.socket.emit("hill-connect", this.props.id);
        this.props.socket.on("update-hill-markers", data => this.setState({ markers: data}));
        fetchHill(this.props.id).then(res => this.setState({ hill: res.data }));
        fetchHillMarkers(this.props.id).then(res => this.setState({ markers: res.data }));
    };

    update = () => this.props.socket.emit("update-hill-markers", ({room: this.props.id, markers: this.state.markers}));

    selectModal = (modal: string) => this.setState({activeModal: modal});

    deselectMarker = () => {
        if (!this.state.isMarkerClick) this.setState({selectedMarker: {_id: "", name: ""}});
        this.setState({isMarkerClick: false});
    }

    selectMarker = (marker: IMarkerData) => this.setState({isMarkerClick: true, selectedMarker: marker});
    
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

    render() {
        return (
            <div>
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
    };
};

export default HillPage;
