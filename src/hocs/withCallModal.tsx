import type { ComponentType, FC } from 'react'
import { Event, eventManager } from '../core/eventManager'

export type ModalProps<
  T extends {
    open?: boolean
    setOpen?: (open: boolean) => void
  } = {
    open?: boolean
    setOpen?: (open: boolean) => void
  },
> = T & {
  show?: () => void
  destroy?: () => void
}

export function withCallModal<
  T extends {
    open?: boolean
    setOpen?: (open: boolean) => void
  },
>(Component: ComponentType<T>) {
  const onDestroy = () => {
    eventManager.emit(Event.Clear)
  }

  const onShow = (props?: Partial<T>) => {
    eventManager.emit(Event.Show, (rest: T) => (
      <Component {...props} {...rest} />
    ))
  }

  const ComponentWithoutGlobalCall: FC<ModalProps<T>> = (props) => (
    <Component {...props} />
  )

  const ComponentWithGlobalCallAndShow = Object.assign(
    ComponentWithoutGlobalCall,
    { show: onShow, destroy: onDestroy },
  )

  return ComponentWithGlobalCallAndShow
}
