// contexts/ModalContext.tsx
'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useModal, type ModalOptions } from '@/hooks/useModal';
import ModalForm from '@/components/forms/ModalForm';

interface ModalContextType {
  openModal: (options?: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider');
  }
  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const { isOpen, modalOptions, openModal, closeModal } = useModal();

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ModalForm
        isOpen={isOpen}
        onClose={closeModal}
        serviceType={modalOptions.serviceType}
        serviceName={modalOptions.serviceName}
        selectedZones={modalOptions.selectedZones}
        totalPrice={modalOptions.totalPrice}
      />
    </ModalContext.Provider>
  );
}