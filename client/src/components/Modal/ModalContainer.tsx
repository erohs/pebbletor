import React from 'react';
import Modal from './Modal';
import { IModalContainerProps } from './interfaces/IModalContainerProps';

class ModalContainer extends React.Component<IModalContainerProps> {
    private modalRef = React.createRef<HTMLDivElement>();
    private closeRef = React.createRef<HTMLButtonElement>();

    toggleScrollLock = () => {
        document.querySelector('html')!.classList.toggle('scroll-lock');
    };

    closeModal = () => {
        if (this.props.trigger !== undefined) {
            this.props.trigger.current!.focus();
        }
        this.toggleScrollLock();
        this.props.onClose()
    };

    onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Escape") this.closeModal();
    };
    
    onClickOutside = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (this.modalRef.current && event.target instanceof HTMLElement && this.modalRef.current.contains(event.target)) return
        this.closeModal();
    };

    onSubmit = () => {
        this.toggleScrollLock();
        this.props.onSubmit();
    }

    componentDidMount() {
        if (this.props.isShown) {
            this.closeRef.current!.focus();
            this.toggleScrollLock();
        }
    }

    componentDidUpdate() {
        if (this.props.isShown) {
            this.closeRef.current!.focus();
            this.toggleScrollLock();
        }
    }

    render() {
        return this.props.isShown ? (
            <Modal onSubmit={this.onSubmit}
                   modalRef={this.modalRef}
                   closeRef={this.closeRef}
                   text={this.props.text}
                   className={this.props.className}
                   closeModal={this.closeModal}
                   onKeyDown={this.onKeyDown}
                   onClickOutside={this.onClickOutside}>
                {this.props.children}
            </Modal>
        ) : null;
    }
}

export default ModalContainer;
