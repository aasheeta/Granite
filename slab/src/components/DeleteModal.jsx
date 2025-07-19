import React from 'react';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, bundle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Are you sure you want to delete this bundle?</h3>
        <p>Bundle: <strong>{bundle?.bundle}</strong></p>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onConfirm}>OK</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
