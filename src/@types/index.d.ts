import type { ReactNode } from 'react'

export type Id = number | string
/**
 * @INTERNAL
 */
export type Modal = ReactNode

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModalContainerProps {
  content: ReactNode
}
