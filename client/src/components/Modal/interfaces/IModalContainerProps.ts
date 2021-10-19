import React from "react";
import { IModalText } from "./IModalText";

export interface IModalContainerProps {
    onSubmit: () => void,
    onClose: () => void,
    isShown: boolean,
    trigger: React.RefObject<HTMLButtonElement>,
    text: IModalText,
    className?: string
}
