import React from "react";
import { IMarkerData } from "../../util/IMarkerData";
import AddIcon from "../Icons/AddIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";
import { IMarker } from "../Marker/interfaces/IMarker";
import { IToolbarProps } from "./interfaces/IToolbarProps";
import "./style/Toolbar.css";

class Toolbar extends React.Component<IToolbarProps> {
    private dropdownContentRef = React.createRef<HTMLDivElement>();
    private dropdownButtonRef = React.createRef<HTMLButtonElement>();

    edit = (marker: IMarkerData) => {
        this.toggleDropdown();
        this.props.selectMarker(marker);
        this.props.selectModal("edit");
    }

    componentDidMount() {
        window.addEventListener("mousedown",  this.hideDropdown);
    }

    toggleDropdown = () => {
        const state = this.dropdownContentRef.current?.style.display;
        if (state === "none") {
            this.dropdownContentRef.current!.style.display = "flex";
        } else {
            this.dropdownContentRef.current!.style.display = "none";
        }
    }

    hideDropdown = (event: MouseEvent) => {
        if (!this.dropdownContentRef.current?.contains(event.target as HTMLDivElement) && 
        !this.dropdownContentRef.current?.contains(event.target as HTMLButtonElement)) {
                this.dropdownContentRef.current!.style.display = "none";
        }
    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this.hideDropdown);
    }
    
    render() {
        const disable = !this.props.markers.some(marker => this.props.selectedMarker !== undefined && marker.id === this.props.selectedMarker.id);
        const empty = this.props.markers.length === 0;
        const style = disable && !empty ? "dropdown__button disabled" : "dropdown__button" ;
        return (
            <div className="toolbar">
                <button className="toolbar__button" onClick={() => this.props.selectModal("add")}><AddIcon className="toolbar__icon" /> Add</button>
                <div className="toolbar__edit">
                    <button className="toolbar__edit-button"
                            disabled={disable} 
                            onClick={() => this.props.selectModal("edit")}>
                        <EditIcon className="toolbar__icon" /><span>Edit</span>
                    </button>
                    <div className="dropdown">
                        <button className={style} 
                                disabled={empty}
                                ref={this.dropdownButtonRef}
                                onClick={() => this.toggleDropdown()}>▼</button>
                        <div className="dropdown__content"
                             style={{display: "none"}}
                             ref={this.dropdownContentRef}>
                            {this.props.markers.map((marker: IMarker, index) => (
                                <button className="dropdown__item"
                                        onClick={() => this.edit({id: marker.id, name: marker.name})}
                                        key={index}>
                                    <div style={{backgroundColor: marker.colour}} className="dropdown__marker"></div>{marker.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <button className="toolbar__button delete" 
                        disabled={disable}
                        onClick={() => this.props.selectModal("delete")}>
                    <DeleteIcon className="toolbar__icon" /><span>Delete</span>
                </button>
            </div>
        );
    }
}

export default Toolbar;
