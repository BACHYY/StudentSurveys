import { Modal } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';

type PopupProps = {
    closePopupHandler: () => void;
    isOpen: boolean;
    children: ReactElement;
};

function Popup({ closePopupHandler, isOpen, children }: PopupProps) {
    return (
        <Modal
            open={isOpen}
            onClose={closePopupHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            {children}
        </Modal>
    );
}

export default Popup;
