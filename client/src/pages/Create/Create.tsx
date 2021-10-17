import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { createHill } from "../../api";
import { INewHill } from "../../components/Hill/interfaces/INewHill";
import "./style/Create.css";

const Create = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const hill: INewHill = { 
            name,
            description,
            author
        };

        createHill(hill)
            .then(() => {
                setRedirect(true);
            });
    }

    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <div className="create">
            <h1 className="create__title">Create a hill chart</h1>
            <form onSubmit={handleSubmit} className="card create__form">
                <label className="create__label">Hill chart name: </label>
                <input type="text"
                       className="create__input"
                       required 
                       value={name}
                       onChange={(e) => setName(e.target.value)} />
                <label className="create__label">Hill chart description: </label>
                <textarea className="create__input"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} />
                <label className="create__label">Hill chart author: </label>
                <input type="text"
                       className="create__input"
                       required
                       value={author}
                       onChange={(e) => setAuthor(e.target.value)} />
                <span>
                    <button className="create__save" type="submit">Save</button>
                </span>
            </form>
        </div>
    );
}

export default Create;
