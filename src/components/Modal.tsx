import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="bg-white p-6 rounded shadow-md z-10 max-w-sm w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('portal-root') as HTMLElement // Assurez-vous d'avoir un élément avec cet ID dans votre index.html
  );
};

export default Modal;
