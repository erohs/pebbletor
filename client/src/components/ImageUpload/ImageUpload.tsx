import React from "react";
import ImageIcon from "../Icons/ImageIcon";
import UploadIcon from "../Icons/UploadIcon";
import { baseUrl } from "../../api";
import { validImageTypes } from "../../util/ValidImageTypes";
import { IImageUploadProps } from "./interfaces/IImageUploadProps";
import { IImageUploadState } from "./interfaces/IImageUploadState";
import "./style/ImageUpload.css";

class ImageUpload extends React.Component<IImageUploadProps, IImageUploadState> {
    private inputRef = React.createRef<HTMLInputElement>()

    state = {
        id: this.props.id,
        imageURI: "",
        hasImage: this.props.imagePath && !this.props.isNewImage ? true : false,
        fileName: this.props.imagePath ? this.props.imagePath.slice(8) : ""
    }

    createImage = () => {
        if(this.state.hasImage) {
            if (this.state.imageURI !== "") {
                return <img className="image-upload__image" src={this.state.imageURI} alt={this.props.alt}/>
            } else if (this.props.imagePath !== undefined) {
                return <img className="image-upload__image" src={`${baseUrl}/${this.props.imagePath}`} alt={this.props.alt}/>
            }
        }
        return null;
    }

    removeImage = () => {
        this.inputRef.current!.value = "";
        this.setState({imageURI: "", hasImage: false, fileName: ""});
        if (this.props.onChange !== undefined) {
            this.props.onChange(null);
            this.props.setIsNewImage(true);
        }
    }

    readURI = (event: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) =>{
            this.setState({imageURI:e.target!.result, hasImage: true, fileName: event.target.value.replace(/.*[/\\]/, '')});
        }
        reader.readAsDataURL(event.target.files![0]);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]){
            const fileType = event.target.files[0].type;
            if (validImageTypes.includes(fileType)) {
                this.readURI(event);
                if (this.props.onChange !== undefined) {
                    this.props.onChange(event.target.files[0]);
                    this.props.setIsNewImage(true);
                }
            }
        }
    }

    handleKeyUp = (event: React.KeyboardEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.key === "Enter") {
            this.inputRef.current!.click();
        }
    }

    render() {
        const imgTag = this.createImage();

        return (
            <div className="image-upload">
                <div className="image-upload__preview">
                    <ImageIcon className="image-upload__placeholder" />
                    {imgTag}
                </div>
                <label className="image-upload__text" htmlFor={this.state.id}>{this.state.fileName}</label>
                {this.state.hasImage ? (
                    <button className="image-upload__remove" onClick={() => this.removeImage()}>
                        &#215;
                    </button>
                ) : null }
                <label className="image-upload__button" 
                       tabIndex={0}
                       htmlFor={this.state.id}
                       onKeyUp={event => this.handleKeyUp(event)}>
                    <UploadIcon className="image-upload__icon" />
                </label>
                <input className="hide-visual"
                       name="image"
                       tabIndex={-1}
                       ref={this.inputRef}
                       type="file"
                       id={this.state.id}
                       onChange={event => this.handleChange(event)}/>
            </div>
        );
    }
}

export default ImageUpload;
