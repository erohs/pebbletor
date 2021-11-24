import ModalContainer from "../Modal/ModalContainer";
import ImageUpload from "../ImageUpload/ImageUpload";
import Resizer from "react-image-file-resizer";
import Notice from "../Notice/Notice";
import { NoticeType } from "../Notice/util/NoticeTypeEnum";
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
    const [imageName, setImageName] = useState("");
    const [isNewImage, setIsNewImage] = useState<boolean>(false);
    const [notice, setNotice] = useState<NoticeType>(NoticeType.None)

    const handleSubmit = () => {
        if (!validateInput()) {
            return;
        }
        const isNewPercentage =  percentage !== props.marker?.percentage || ((props.marker.status === MarkerStatus.Complete || props.marker.status === MarkerStatus.Inactive) && status === MarkerStatus.Active);
        const formData = new FormData();
        formData.append("hillId", props.hillId);
        formData.append("name", name);
        formData.append("percentage", percentage.toString());
        formData.append("isNewPercentage", isNewPercentage.toString());
        formData.append("colour", colour);
        formData.append("status", status);
        
        if (image !== null) {
            formData.append("image", image!, imageName)
        }

        if (props.marker !== undefined) {
            formData.append("_id", props.marker._id);
            formData.append("x", props.marker.x.toString());
            formData.append("y", props.marker.y.toString());
            if (props.marker.imagePath !== undefined) {
                formData.append("imagePath", props.marker.imagePath);
            }
            props.update(props.marker._id, formData, isNewImage);
            closeModal();
        } else {
            props.add(formData);
            closeModal();
        }

        props.selectModal(ModalType.None);
    }

    const handleImageChange = (file: File | null) => {
        if (file !== null) {
            Resizer.imageFileResizer(
                file,
                64,
                64,
                "PNG",
                100,
                0,
                (uri) => {
                    setImageName(file.name);
                    setImage(uri as File);
                },
                "blob"
            );
        } else setImage(null);
    }

    const validateInput = (): Boolean => {
        setNotice(NoticeType.None)
        if (!name.trim()) {
            setNotice(NoticeType.Error);
            return false;
        }
        return true;
    }

    const closeModal = () => {
        document.querySelector('html')!.classList.toggle('scroll-lock');
        props.selectModal(ModalType.None);
    }
    
    return (
        <ModalContainer onSubmit={() => handleSubmit()}
                        onClose={() => props.selectModal(ModalType.None)}
                        manualClose={true}
                        isShown={true}
                        trigger={props.buttonRef}
                        text={{title: props.title, submit: "Save"}}>
            <div className="marker-modal__content">
                <label className="marker-modal__label">Marker image (optional): </label>
                <ImageUpload id="marker-modal__upload" 
                             alt="marker image"
                             imagePath={props.marker?.imagePath}
                             isNewImage={isNewImage}
                             setIsNewImage={setIsNewImage}
                             onChange={handleImageChange} />
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
            { notice !== NoticeType.None ? <Notice text="Name field must not be empty" type={NoticeType.Error} /> : null }            
        </ModalContainer>
    );
}

export default MarkerModal;
