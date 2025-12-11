import type { ComponentType, FC } from 'react'
import { v4 as uuidv4 } from 'uuid'
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
  show?: () => string
  close?: () => void
  destroy?: () => void
}

export function withCallModal<
  T extends {
    open?: boolean
    setOpen?: (open: boolean) => void
  },
>(Component: ComponentType<T>) {
  // Armazena o id do modal na closure
  let modalId: string | null = null

  const onClose = () => {
    if (modalId) {
      eventManager.emit(Event.Close, modalId)
      modalId = null
    }
  }

  const onDestroy = () => {
    eventManager.emit(Event.Clear)
  }

  const onShow = (props?: Partial<T>): string => {
    const id = uuidv4()
    modalId = id

    eventManager.emit(Event.Show, {
      component: (rest: T) => <Component {...props} {...rest} />,
      id,
    })

    return id
  }

  const ComponentWithoutGlobalCall: FC<ModalProps<T>> = (props) => (
    <Component {...props} />
  )

  const ComponentWithGlobalCallAndShow = Object.assign(
    ComponentWithoutGlobalCall,
    { show: onShow, close: onClose, destroy: onDestroy },
  )

  return ComponentWithGlobalCallAndShow
}
