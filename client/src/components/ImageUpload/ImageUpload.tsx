import React from "react";
import blank from "../../images/blank.png";
import DeleteIcon from "../Icons/DeleteIcon";
import { IImageUploadProps } from "./interfaces/IImageUploadProps";
import { IImageUploadState } from "./interfaces/IImageUploadState";
import "./style/ImageUpload.css";

class ImageUpload extends React.Component<IImageUploadProps, IImageUploadState> {
    state = {
        id: this.props.id,
        imageURI: blank,
        hasImage: false
    }

    createImage = () => {
        let img = null;
        if (this.state.imageURI !== null) {
            img = <img className="image-upload__image" src={this.state.imageURI} alt={this.props.alt}/>
        }
        return img;
    }

    removeImage = () => {
        this.setState({imageURI: blank, hasImage: false})
    }

    readURI = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]){
            let reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) =>{
                this.setState({imageURI:e.target!.result, hasImage: true});
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.readURI(event);
        if (this.props.onChange !== undefined) {
            this.props.onChange(event);
        }
    }

    render() {
        const imgTag = this.createImage();

        return (
            <div className="image-upload">
               <label className="image-upload__button" htmlFor={this.state.id}>Upload</label>
               <input className="hide-visual"
                      type="file"
                      id={this.state.id}
                      onChange={event => this.handleChange(event)}/>
                <div className="image-upload__preview">
                    {imgTag}
                    {this.state.hasImage ? (
                        <button className="image-upload__remove" onClick={() => this.removeImage()}>
                            <DeleteIcon className="image-upload__remove-icon"/>
                        </button>
                    ) : null }
                    
                </div>
            </div>
        );
    }
}

export default ImageUpload;
