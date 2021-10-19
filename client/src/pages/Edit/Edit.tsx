import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { fetchHill, updateHill } from "../../api";
import { IHill } from "../../components/Hill/interfaces/IHill";
import { hillPlaceholder } from "../../components/Hill/util/hillPlaceholder";
import { IEditProps } from "./interfaces/IEditProps";
import "./style/Edit.css";

const Edit = (props: IEditProps) => {
    const [hill, setHill] = useState(hillPlaceholder);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetchHill(props.id)
            .then(res => {
                setHill(res.data);
                setName(res.data.name);
                setDescription(res.data.description);
                setAuthor(res.data.author);
            });
    }, [props.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newHill: IHill = {
            _id: hill._id,
            name,
            description,
            author,
            createdAt: hill.createdAt,
            updatedAt: hill.updatedAt
        };

        updateHill(props.id, newHill)
            .then(() => {
                setRedirect(true);
            });
    }

    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <div className="edit">
            <h1 className="edit__title">Edit a hill chart</h1>
            <form onSubmit={handleSubmit} className="card form">
                <label className="form__label">Hill chart name: </label>
                <input type="text"
                       className="form__input"
                       required 
                       value={name}
                       onChange={(e) => setName(e.target.value)} />
                <label className="form__label">Hill chart description: </label>
                <textarea className="form__input"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} />
                <label className="form__label">Hill chart author: </label>
                <input type="text"
                       className="form__input"
                       required
                       value={author}
                       onChange={(e) => setAuthor(e.target.value)} />
                <span>
                    <button className="form__save" type="submit">Save</button>
                </span>
            </form>
        </div>
    );
}

export default Edit;
