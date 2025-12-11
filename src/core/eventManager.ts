import { ReactNode } from 'react'
import { Id, Modal } from '../@types'

export const enum Event {
  Show,
  Clear,
  Close,
  DidMount,
  WillUnmount,
  Change,
  ClearWaitingQueue,
}

type OnShowCallback = (content: any, options: any) => void
type OnClearCallback = () => void
type OnCloseCallback = (id: Id) => void
type OnClearWaitingQueue = (params: any) => void

export type OnChangeCallback = (modal: Modal) => void

type Callback =
  | OnShowCallback
  | OnClearCallback
  | OnCloseCallback
  | OnClearWaitingQueue
  | OnChangeCallback
type TimeoutId = ReturnType<typeof setTimeout>

export interface EventManager {
  list: Map<Event, Callback[]>
  emitQueue: Map<Event, TimeoutId[]>
  on(event: Event.Show, callback: OnShowCallback): EventManager
  on(event: Event.Clear, callback: OnClearCallback): EventManager
  on(event: Event.Close, callback: OnCloseCallback): EventManager
  off(event: Event, callback?: Callback): EventManager
  cancelEmit(event: Event): EventManager
  emit(event: Event.Show, content: ReactNode | any): void
  emit(event: Event.Clear): void
  emit(event: Event.Close, id: string | number): void
  clearEvents(): void
}

export const eventManager: EventManager = {
  list: new Map(),
  emitQueue: new Map(),

  on(event: Event, callback: Callback) {
    this.list.has(event) || this.list.set(event, [])
    this.list.get(event)!.push(callback)
    return this
  },

  off(event, callback) {
    if (callback) {
      const cb = this.list.get(event)!.filter((cb) => cb !== callback)
      this.list.set(event, cb)
      return this
    }
    this.list.delete(event)
    return this
  },

  cancelEmit(event) {
    const timers = this.emitQueue.get(event)
    if (timers) {
      timers.forEach(clearTimeout)
      this.emitQueue.delete(event)
    }

    return this
  },

  emit(event: Event, ...args: any[]) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback: Callback) => {
        const timer: TimeoutId = setTimeout(() => {
          callback(...(args as [any, any]))
        }, 0)

        this.emitQueue.has(event) || this.emitQueue.set(event, [])
        this.emitQueue.get(event)!.push(timer)
      })
  },
  clearEvents() {
    this.list.clear()
    this.emitQueue.clear()
  },
}
