import { useCalledModal } from '../hooks/useCalledModal';

export function ModalContainer() {
  const { modalToRender } = useCalledModal();

  return modalToRender && modalToRender;
}
