// hooks/useModal.ts
'use client';

import { useState, useCallback } from 'react';

export interface ModalOptions {
  serviceType?: 'polish' | 'ceramic' | 'ppf' | 'general';
  serviceName?: string;
  selectedZones?: string[];
  totalPrice?: number;
}

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({});

  const openModal = useCallback((options: ModalOptions = {}) => {
    setModalOptions(options);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, modalOptions, openModal, closeModal };
}