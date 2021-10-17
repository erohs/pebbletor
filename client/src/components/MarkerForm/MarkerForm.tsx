import React, { useState } from "react";
import { Colour } from "../../util/ColourEnum";
import { MarkerStatus } from "../Marker/util/MarkerStatusEnum";
import { IMarker } from "../Marker/interfaces/IMarker";
import { INewMarker } from "../Marker/interfaces/INewMarker";
import { IMarkerFormProps } from "./interfaces/IMarkerFormProps";
import "./style/MarkerForm.css";

const MarkerForm = (props: IMarkerFormProps) => {
    const [name, setName] = useState(props.marker?.name || "");
    const [percentage, setPercentage] = useState(props.marker?.percentage || "50");
    const [colour, setColour] = useState(props.marker?.colour || Colour.Gray);
    const [status, setStatus] = useState(props.marker?.status || MarkerStatus.Active);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

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

        if (props.marker?._id) {
            const marker:IMarker = { 
                ...newMarker,
                _id: props.marker?._id,
                createdAt: props.marker?.createdAt,
                updatedAt: props.marker?.updatedAt
            };
            props.update(marker);
        } else props.add(newMarker);

        props.selectModal("");
    }

    return (
        <div>
            <div className="modal-form__header">
                <h2 className="modal-form__header-title">{props.title}</h2>
                <button className="modal-form__header-close" onClick={() => props.selectModal("")}>x</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form__content">
                <label className="modal-form__label">Marker name: </label>
                <input type="text"
                        className="modal-form__input"
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                <label className="modal-form__label">Marker percentage: </label>
                <input type="text"
                        className="modal-form__input"
                        required
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)} />
                <label className="modal-form__label">Marker colour: </label>
                <select className="modal-form__input"
                        required
                        value={colour}
                        onChange={(e) => setColour(e.target.value)}>
                        {(Object.keys(Colour) as Array<keyof typeof Colour>).map((key) => {
                            return <option value={Colour[key]} style={{color: Colour[key]}}>{key}</option>;
                        })}
                </select>
                <label className="modal-form__label">Marker status: </label>
                <select className="modal-form__input"
                        required
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        {(Object.keys(MarkerStatus) as Array<keyof typeof MarkerStatus>).map((key) => {
                            return <option value={MarkerStatus[key]}>{key}</option>;
                        })}
                </select>
                <div className="modal-form__content-buttons">
                    <button className="modal-form__button" onClick={() => props.selectModal("")}>Cancel</button>
                    <button className="modal-form__button save" type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default MarkerForm;
