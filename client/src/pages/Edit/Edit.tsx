import React, { useState } from "react";
import { IMarker } from "../../components/Marker/interfaces/IMarker";
import "./style/Edit.css";

const Edit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const markers: IMarker[] = [];
        const hill = { 
            name: name,
            description: description,
            author: author,
            markers: markers 
        };

        console.log(hill);
    }

    return (
        <div className="create">
            <form onSubmit={handleSubmit}>
                <label>Hill chart name: </label>
                <input type="text"
                       required 
                       value={name}
                       onChange={(e) => setName(e.target.value)} />
                <label>Hill chart description: </label>
                <textarea required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} />
                <label>Hill chart author: </label>
                <input type="text"
                       required
                       value={author}
                       onChange={(e) => setAuthor(e.target.value)} />
                <button type="submit">Save</button>
            </form>
            <p>{name}</p>
            <p>{description}</p>
            <p>{author}</p>
        </div>
    );
}

export default Edit;
