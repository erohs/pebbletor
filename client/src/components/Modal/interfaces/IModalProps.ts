import { IModalText } from "./IModalText";

export interface IModalProps {
    modalRef: React.RefObject<HTMLDivElement>;
    closeRef: React.RefObject<HTMLButtonElement>;
    text: IModalText,
    className?: string,
    onSubmit: () => void;
    closeModal: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
    onClickOutside: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
