import React from "react";
import MarkerModal from "../MarkerModal/MarkerModal";
import ModalContainer from "../Modal/ModalContainer";
import { IModalSelectorProps } from "./interfaces/IModalSelectorProps";
import { ModalType } from "./util/ModalTypeEnum";
import "./style/ModalSelector.css";

const ModalSelector : React.FC<IModalSelectorProps> = props => {
    switch(props.modal) {
        case ModalType.Add:
            return (
                <MarkerModal title="Add Marker" 
                             hillId={props.hillId}
                             buttonRef={props.addButtonRef}
                             add={props.add} 
                             update={props.update}
                             selectModal={props.selectModal} />
            );
        case ModalType.Edit:
            return (
                <MarkerModal title="Edit Marker"
                             hillId={props.hillId}
                             buttonRef={props.updateButtonRef}
                             add={props.add}
                             update={props.update} 
                             marker={props.marker}
                             selectModal={props.selectModal} />
            );
        case ModalType.Delete:
            return (
                <ModalContainer onSubmit={() => props.delete(props.marker!._id)}
                                onClose={() => props.selectModal(ModalType.None)}
                                isShown={true}
                                trigger={props.deleteButtonRef}
                                text={{title: "Delete marker", submit: "Delete"}}
                                className="delete">
                    <p>Are you sure you want to delete <b>{props.marker!.name}</b>?</p>
                </ModalContainer>
            );
        default: return null;
    }
}

export default ModalSelector;
