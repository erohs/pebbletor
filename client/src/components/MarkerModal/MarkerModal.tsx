import ModalContainer from "../Modal/ModalContainer";
import { useState } from "react";
import { Colour } from "../../util/ColourEnum";
import { MarkerStatus } from "../Marker/util/MarkerStatusEnum";
import { IMarker } from "../Marker/interfaces/IMarker";
import { INewMarker } from "../Marker/interfaces/INewMarker";
import { IMarkerModalProps } from "./interfaces/IMarkerModalProps";
import { ModalType } from "../ModalSelector/util/ModalTypeEnum";
import "./style/MarkerModal.css";

const MarkerModal = (props: IMarkerModalProps) => {
    const [name, setName] = useState(props.marker?.name || "");
    const [percentage, setPercentage] = useState(props.marker?.percentage || "50");
    const [colour, setColour] = useState(props.marker?.colour || Colour.Gray);
    const [status, setStatus] = useState(props.marker?.status || MarkerStatus.Active);

    const handleSubmit = () => {
        const newMarker: INewMarker = {
            hillId: props.hillId,
            name,
            percentage: parseInt(percentage.toString()),
            isNewPercentage: percentage !== props.marker?.percentage || 
            ((props.marker.status === MarkerStatus.Complete || props.marker.status === MarkerStatus.Inactive) && status === MarkerStatus.Active),
            currentPos: props.marker?.currentPos || [],
            colour,
            status,
        }

        if (props.marker !== undefined) {
            const marker:IMarker = { 
                ...newMarker,
                _id: props.marker._id,
                createdAt: props.marker.createdAt,
                updatedAt: props.marker.updatedAt
            };
            props.update(marker);
        } else props.add(newMarker);

        props.selectModal(ModalType.None);
    }
    
    return (
        <ModalContainer onSubmit={() => handleSubmit()}
                        onClose={() => props.selectModal(ModalType.None)}
                        isShown={true}
                        trigger={props.buttonRef}
                        text={{title: props.title, submit: "Save"}}>
            <div className="marker-modal__content">
                <label className="marker-modal__label">Marker name: </label>
                <input type="text"
                        className="marker-modal__input"
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                <label className="marker-modal__label">Marker percentage: </label>
                <input type="text"
                        className="marker-modal__input"
                        required
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)} />
                <label className="marker-modal__label">Marker colour: </label>
                <select className="marker-modal__input"
                        required
                        value={colour}
                        onChange={(e) => setColour(e.target.value)}>
                        {(Object.keys(Colour) as Array<keyof typeof Colour>).map((key) => {
                            return <option value={Colour[key]} style={{color: Colour[key]}}>{key}</option>;
                        })}
                </select>
                <label className="marker-modal__label">Marker status: </label>
                <select className="marker-modal__input"
                        required
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        {(Object.keys(MarkerStatus) as Array<keyof typeof MarkerStatus>).map((key) => {
                            return <option value={MarkerStatus[key]}>{key}</option>;
                        })}
                </select>
            </div>
        </ModalContainer>
    );
}

export default MarkerModal;
