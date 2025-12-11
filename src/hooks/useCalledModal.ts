import type { Modal } from '../@types'

import { useMap } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Event, eventManager } from '../core/eventManager'

export function useCalledModal() {
  const mapModals = useMap<string>()

  useEffect(() => {
    eventManager
      .cancelEmit(Event.WillUnmount)
      .on(Event.Show, buildModal)
      .on(Event.Clear, destroyModals)
      .on(Event.Close, closeModal)

    return () => {
      mapModals.clear()
      eventManager.clearEvents()
    }
  }, [mapModals])

  function destroyModals() {
    mapModals.clear()
  }

  function closeModal(id: string | number) {
    mapModals.delete(String(id))
  }

  function buildModal(modalOrObject: Modal | { component: Modal; id: string }) {
    if (
      typeof modalOrObject === 'object' &&
      modalOrObject !== null &&
      'component' in modalOrObject &&
      'id' in modalOrObject
    ) {
      return appendModal(modalOrObject.component, modalOrObject.id)
    }
    return appendModal(modalOrObject as Modal)
  }

  function appendModal(modal: Modal, modalId?: string) {
    for (const [key, value] of Array.from(mapModals)) {
      if (value.open === false) {
        mapModals.delete(key)
      }
    }

    const id = modalId || uuidv4()
    mapModals.set(id, {
      id,
      component: modal,
      open: true,
    })

    return id
  }

  return {
    mapModals,
  }
}
