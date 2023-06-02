import { eventManager, Event } from '../core/eventManager';

export function withCallModal<T>(Component: React.FC<Partial<T>>) {
  console.log('withCallModal called');

  type Props = T & {
    show?: () => void;
    hide?: () => void;
  };

  const onClose = () => {
    eventManager.emit(Event.Clear);
  };

  const onShow = (props: Partial<T>) => {
    eventManager.emit(Event.Show, <Component onClose={onClose} {...props} />);
  };

  const ComponentWithoutGlobalCall: React.FC<Props> = (props) => (
    <Component {...props} />
  );

  const ComponentWithGlobalCallAndShow = Object.assign(
    ComponentWithoutGlobalCall,
    { show: onShow, close: onClose },
  );

  return ComponentWithGlobalCallAndShow;
}
