import { useCalledModal } from '../hooks/useCalledModal';

export const ModalContainer: React.FC = () => {
  const { modalToRender } = useCalledModal();

  return <>{modalToRender && modalToRender}</>;
};
