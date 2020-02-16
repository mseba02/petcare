// imports
import React from 'react';
import './modal.css';

// modal component
const Modal = (props) => {
    return (
        <div className={`globalpopup ${props.className}`}>
            {props.children}
        </div>
    )
};

// export
export default Modal;