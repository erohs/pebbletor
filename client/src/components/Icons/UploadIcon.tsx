import { IIconProps } from "./interfaces/IIconProps";
import "./style/Icon.css";

const UploadIcon = (props: IIconProps) => {
    return (
        <svg className={`icon ${props.className}`} fill={props.fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
            <path d="M90 54a5.997 5.997 0 0 0-6 6v18H12V60a6 6 0 0 0-12 0v24a5.997 5.997 0 0 0 6 6h84a5.997 5.997 0 0 0 6-6V60a5.997 5.997 0 0 0-6-6Z"/>
            <path d="M34.242 34.242 42 26.484V60a6 6 0 0 0 12 0V26.484l7.758 7.758a6 6 0 0 0 8.484-8.484l-18-18a5.998 5.998 0 0 0-8.484 0l-18 18a6 6 0 0 0 8.484 8.484Z"/>
        </svg>
    );
}

export default UploadIcon;
