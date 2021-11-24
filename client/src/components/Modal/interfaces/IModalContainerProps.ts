import React from "react";
import { IModalText } from "./IModalText";

export interface IModalContainerProps {
    onSubmit: () => void,
    onClose: () => void,
    manualClose: boolean,
    isShown: boolean,
    trigger?: React.RefObject<HTMLButtonElement>,
    text: IModalText,
    className?: string
}
