import React from 'react'
import './Modal.css'

function Modal({ isOpen, onClose, children }) {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className='close-btn' onClick={onClose}>X</div>
                {children}
            </div>
        </div>
    )
}

export default Modal