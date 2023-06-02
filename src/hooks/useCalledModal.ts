import { useEffect, useState } from 'react';
import { Id, Modal, ModalContainerProps } from '../@types';
import { eventManager, Event } from '../core/eventManager';

export interface ContainerInstance {
  toastKey: number;
  displayedModal: number;
  props: ModalContainerProps;
  containerId?: Id | null;
  getModal: (id: Id) => Modal | null | undefined;
  count: number;
}

export function useCalledModal() {
  const [modalToRender, setModalToRender] = useState<Modal>();

  useEffect(() => {
    eventManager
      .cancelEmit(Event.WillUnmount)
      .on(Event.Show, buildModal)
      .on(Event.Clear, removeModal);

    return () => {
      setModalToRender(undefined);
      eventManager.clearEvents();
    };
  }, []);

  function removeModal() {
    setModalToRender(undefined);
  }

  function buildModal(modal: Modal) {
    appendModal(modal);
  }

  function appendModal(modal: Modal) {
    setModalToRender(modal);
  }

  return {
    modalToRender,
  };
}
