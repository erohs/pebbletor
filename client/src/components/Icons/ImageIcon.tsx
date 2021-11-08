import { IIconProps } from "./interfaces/IIconProps";
import "./style/Icon.css";

const ImageIcon = (props: IIconProps) => {
    return (
        <svg className={`icon ${props.className}`} fill={props.fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48">
            <path d="M56 0H8a8 8 0 0 0-8 8v32a7.27 7.27 0 0 0 .48 2.64A8.05 8.05 0 0 0 4 46.91 8.1 8.1 0 0 0 8 48h48a8.08 8.08 0 0 0 6.72-3.65A8.18 8.18 0 0 0 64 40V8a8 8 0 0 0-8-8ZM33 42.67H8a2.35 2.35 0 0 1-.83-.16l14.48-19.76 11.87 11.86 3.76 3.76 4.27 4.3ZM58.67 40A2.68 2.68 0 0 1 56 42.67h-6.88l-8-8.06 6.82-6.74 10.78 12Zm0-8.13L50 22.21a2.72 2.72 0 0 0-1.89-.88 2.53 2.53 0 0 0-1.95.78l-8.82 8.74-14.11-14.08a2.84 2.84 0 0 0-2.11-.77 2.76 2.76 0 0 0-1.95 1.09L5.33 36V8A2.68 2.68 0 0 1 8 5.33h48A2.68 2.68 0 0 1 58.67 8Z" />
            <circle cx="37.33" cy="18.67" r="5.33" />
        </svg>
    );
}

export default ImageIcon;
