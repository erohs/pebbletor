import React from "react";
import MarkerForm from "../MarkerForm/MarkerForm";
import { IModalProps } from "./interfaces/IModalProps";
import "./style/Modal.css";

class Modal extends React.Component<IModalProps> {
    render() {
        switch(this.props.modal) {
            case "add":
                return (
                    <div className="modal">
                        <div className="modal__card">
                        <MarkerForm title="Add Marker" 
                                    hillId={this.props.hillId}
                                    add={this.props.add} 
                                    update={this.props.update}
                                    selectModal={this.props.selectModal} />
                        </div>
                    </div>
                );
            case "edit":
                return (
                    <div className="modal">
                        <div className="modal__card">
                            <MarkerForm title="Edit Marker"
                                        hillId={this.props.hillId}
                                        add={this.props.add}
                                        update={this.props.update} 
                                        marker={this.props.marker}
                                        selectModal={this.props.selectModal} />
                        </div>
                    </div>
                );
            case "delete":
                return (
                    <div className="modal">
                        <div className="modal__card">
                            <div className="modal-form__header">
                                <h2 className="modal-form__header-title">Delete Marker</h2>
                                <button className="modal-form__header-close" onClick={() => this.props.selectModal("")}>x</button>
                            </div>
                            <div className="modal-form__content">
                                <p className="modal-form__text" >Are you sure you want to delete '{this.props.marker!.name}'?</p>
                                <div className="modal-form__content-buttons">
                                    <button className="modal-form__button" onClick={() => this.props.selectModal("")}>Cancel</button>
                                    <button className="modal-form__button delete" 
                                        onClick={() => {
                                            this.props.delete(this.props.marker!._id);
                                            this.props.selectModal("");
                                        }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <></>;
        }
    }
}

export default Modal;
