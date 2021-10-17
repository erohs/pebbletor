import { IIconProps } from "./interfaces/IIconProps";
import "./style/Icon.css";

const AddIcon = (props: IIconProps) => {
    return (
        <svg className={`icon ${props.className}`} fill={props.fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.25 0H2.75C1.23 0 0 1.23 0 2.75v15.5C0 19.77 1.23 21 2.75 21h6.59a8.731 8.731 0 01-.84-3.75c0-1.15.22-2.25.63-3.26-.04.01-.08.01-.13.01H4c-.55 0-1-.45-1-1s.45-1 1-1h5c.38 0 .72.22.88.54A8.827 8.827 0 0112.36 10H4c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1 0 .05 0 .09-.01.13.93-.38 1.95-.6 3.01-.62V2.75C17 1.23 15.77 0 14.25 0zM8 6H4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1z"/>
            <path d="M17.25 10.5c-3.722 0-6.75 3.028-6.75 6.75S13.528 24 17.25 24 24 20.972 24 17.25s-3.028-6.75-6.75-6.75zM20 18.25h-1.75V20a1 1 0 01-2 0v-1.75H14.5a1 1 0 010-2h1.75V14.5a1 1 0 012 0v1.75H20a1 1 0 010 2z"/>
        </svg>
    );
}

export default AddIcon;
