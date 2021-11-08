import ModalContainer from "../Modal/ModalContainer";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useState } from "react";
import { Colour } from "../../util/ColourEnum";
import { MarkerStatus } from "../Marker/util/MarkerStatusEnum";
import { IMarkerModalProps } from "./interfaces/IMarkerModalProps";
import { ModalType } from "../ModalSelector/util/ModalTypeEnum";
import "./style/MarkerModal.css";

const MarkerModal = (props: IMarkerModalProps) => {
    const [name, setName] = useState(props.marker?.name || "");
    const [percentage, setPercentage] = useState(props.marker?.percentage || "50");
    const [colour, setColour] = useState(props.marker?.colour || Colour.Gray);
    const [status, setStatus] = useState(props.marker?.status || MarkerStatus.Active);
    const [image, setImage] = useState<File | null>(null);
    const [imagePath, setImagePath] = useState(props.marker?.imagePath || undefined)

    const handleSubmit = () => {
        const isNewPercentage =  percentage !== props.marker?.percentage || ((props.marker.status === MarkerStatus.Complete || props.marker.status === MarkerStatus.Inactive) && status === MarkerStatus.Active);
        const formData = new FormData();
        formData.append("hillId", props.hillId);
        formData.append("name", name);
        formData.append("percentage", percentage.toString());
        formData.append("isNewPercentage", isNewPercentage.toString());
        formData.append("colour", colour);
        formData.append("status", status);
        
        if (image !== null) {
            formData.append("image", image!, image?.name)
        }

        if (props.marker !== undefined) {
            formData.append("_id", props.marker._id);
            formData.append("x", props.marker.x.toString());
            formData.append("y", props.marker.y.toString());
            if (props.marker.imagePath !== undefined) {
                formData.append("imagePath", props.marker.imagePath);
            }
            
            props.update(props.marker._id, formData);
        } else props.add(formData);

        props.selectModal(ModalType.None);
    }
    
    return (
        <ModalContainer onSubmit={() => handleSubmit()}
                        onClose={() => props.selectModal(ModalType.None)}
                        isShown={true}
                        trigger={props.buttonRef}
                        text={{title: props.title, submit: "Save"}}>
            <div className="marker-modal__content">
                <label className="marker-modal__label">Marker image (optional): </label>
                <ImageUpload id="marker-modal__upload" 
                             alt="marker image"
                             imagePath={props.marker?.imagePath}
                             onChange={setImage} />
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
                            return <option key={key} value={Colour[key]} style={{color: Colour[key]}}>{key}</option>;
                        })}
                </select>
                <label className="marker-modal__label">Marker status: </label>
                <select className="marker-modal__input"
                        required
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        {(Object.keys(MarkerStatus) as Array<keyof typeof MarkerStatus>).map((key) => {
                            return <option key={key} value={MarkerStatus[key]}>{key}</option>;
                        })}
                </select>
            </div>
        </ModalContainer>
    );
}

export default MarkerModal;
