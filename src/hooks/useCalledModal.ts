import type { Modal } from '../@types'

import { useMap } from '@uidotdev/usehooks'
import { useEffect } from 'react'

import { Event, eventManager } from '../core/eventManager'

export function useCalledModal() {
  const mapModals = useMap<string>()

  useEffect(() => {
    eventManager
      .cancelEmit(Event.WillUnmount)
      .on(Event.Show, buildModal)
      .on(Event.Clear, destroyModals)

    return () => {
      mapModals.clear()
      eventManager.clearEvents()
    }
  }, [mapModals])

  function destroyModals() {
    mapModals.clear()
  }

  function buildModal(modal: Modal) {
    appendModal(modal)
  }

  function appendModal(modal: Modal) {
    for (const [key, value] of Array.from(mapModals)) {
      if (value.open === false) {
        mapModals.delete(key)
      }
    }

    const id = crypto.randomUUID()
    mapModals.set(id, {
      id,
      component: modal,
      open: true,
    })
  }

  return {
    mapModals,
  }
}
