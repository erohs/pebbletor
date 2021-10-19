import React from 'react';
import Modal from './Modal';
import { IModalContainerProps } from './interfaces/IModalContainerProps';
import { IModalContainerState } from './interfaces/IModalContainerState';

class ModalContainer extends React.Component<IModalContainerProps, IModalContainerState> {
    private modalRef = React.createRef<HTMLDivElement>();
    private closeRef = React.createRef<HTMLButtonElement>();

    state = { isShown: this.props.isShown }

    toggleScrollLock = () => {
        document.querySelector('html')!.classList.toggle('scroll-lock');
    };

    closeModal = () => {
        this.setState({ isShown: false });
        this.props.trigger.current!.focus();
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

    componentDidMount() {
        if (this.state.isShown) {
            this.closeRef.current!.focus();
            this.toggleScrollLock();
        }
    }

    render() {
        return this.state.isShown ? (
            <Modal onSubmit={this.props.onSubmit}
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
