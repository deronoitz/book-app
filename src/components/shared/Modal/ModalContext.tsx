import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  showModal: (id: string, data?: object) => void;
  closeModal: () => void;
  isVisible: (id: string) => boolean;
  modalData: object;
}

export interface ModalDataState {
  [key: string]: any;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<string[]>([]);
  const [modalData, setModalData] = useState<ModalDataState>({});

  function showModal(id: string, data?: object) {
    setModals([...modals, id]);
    setModalData({ ...modalData, [id]: data });
  }

  function closeModal() {
    setModals((currentModals) => currentModals.slice(1));
    setModalData({});
  }

  function isVisible(id: string) {
    return modals.includes(id);
  }

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, isVisible, modalData }}
    >
      {children}
    </ModalContext.Provider>
  );
};
