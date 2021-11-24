import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { IModalProps } from './interfaces/IModalProps';
import "./style/Modal.css";

const Modal : React.FC<IModalProps> = props => {
    const classname = `modal__button highlight ${props.className}`;

    return ReactDOM.createPortal(
        <FocusTrap>
            <aside role="dialog"
                   tabIndex={-1}
                   aria-modal="true"
                   className="modal"
                   onMouseDown={event => props.onClickOutside(event)}
                   onKeyDown={event => props.onKeyDown(event)}>
                <div className="modal__card" ref={props.modalRef}>
                    <div className="modal__header"> 
                        <h2 className="modal__header-title">{props.text.title}</h2>
                        <button ref={props.closeRef}
                                className="modal__header-close"
                                aria-label="Close Modal"
                                aria-labelledby="close-modal"
                                onClick={() => props.closeModal()}>×</button>
                        <span id="close-modal" className="hide-visual">
                            Close
                        </span>
                    </div>
                    <div className="modal__content">{props.children}</div>
                    <div className="modal__footer">
                        <button className="modal__button" onClick={() => props.closeModal()}>Cancel</button>
                        <button className={classname} 
                                onClick={() => {
                                    props.onSubmit()
                                    if (!props.manualClose) {
                                        props.closeModal()
                                    }
                                }}>{props.text.submit}</button>
                    </div>
                </div>
            </aside>
        </FocusTrap>,
        document.body
    );
};

export default Modal;
