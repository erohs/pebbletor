import React from "react";
import AddIcon from "../Icons/AddIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";
import ModalSelector from "../ModalSelector/ModalSelector";
import { IMarker } from "../Marker/interfaces/IMarker";
import { IToolbarProps } from "./interfaces/IToolbarProps";
import { IToolbarStatus } from "./interfaces/IToolbarStatus";
import { ModalType } from "../ModalSelector/util/ModalTypeEnum";
import { baseUrl } from "../../api";
import "./style/Toolbar.css";

class Toolbar extends React.Component<IToolbarProps, IToolbarStatus> {
    private dropdownContentRef = React.createRef<HTMLDivElement>();
    private dropdownButtonRef = React.createRef<HTMLButtonElement>();
    private addButtonRef = React.createRef<HTMLButtonElement>();
    private editButtonRef = React.createRef<HTMLButtonElement>();
    private deleteButtonRef = React.createRef<HTMLButtonElement>();

    state = { activeModal: ModalType.None }
    
    selectModal = (modal: string) => this.setState({activeModal: modal});

    openEditModal = (id: string) => {
        this.toggleDropdown();
        this.props.selectMarker(id);
        this.selectModal(ModalType.Edit);
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
        const disable = !this.props.markers.some(marker => this.props.selectedMarker !== undefined && marker._id === this.props.selectedMarker);
        const empty = this.props.markers.length === 0;
        const style = disable && !empty ? "dropdown__button disabled" : "dropdown__button" ;
        return (
            <>
                <div className="toolbar">
                    <button className="toolbar__button"
                            ref={this.addButtonRef}
                            onClick={() => this.selectModal(ModalType.Add)}><AddIcon className="toolbar__icon" /> Add</button>
                    <div className="toolbar__edit">
                        <button className="toolbar__edit-button"
                                ref={this.editButtonRef}
                                disabled={disable} 
                                onClick={() => this.selectModal(ModalType.Edit)}>
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
                                            onClick={() => this.openEditModal(marker._id)}
                                            key={index}>
                                        { marker.imagePath ? 
                                            <img src={`${baseUrl}/${marker.imagePath}`} className="dropdown__marker" alt="marker"/> : 
                                            <div style={{backgroundColor: marker.colour}} className="dropdown__marker" />
                                        }
                                        {marker.name}
                                        
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="toolbar__button delete"
                            ref={this.deleteButtonRef}
                            disabled={disable}
                            onClick={() => this.selectModal(ModalType.Delete)}>
                        <DeleteIcon className="toolbar__icon" /><span>Delete</span>
                    </button>
                </div>
                <ModalSelector modal={this.state.activeModal}
                               hillId={this.props.hillId}
                               add={this.props.add}
                               addButtonRef={this.addButtonRef}
                               update={this.props.update}
                               updateButtonRef={this.editButtonRef}
                               delete={this.props.delete}
                               deleteButtonRef={this.deleteButtonRef}
                               marker={this.props.markers.find((m: IMarker) => m._id === this.props.selectedMarker)}
                               selectModal={this.selectModal} />
            </>
        );
    }
}

export default Toolbar;
