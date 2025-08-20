import type { ReactNode } from 'react'

export type Id = number | string
/**
 * @INTERNAL
 */
export type Modal = ReactNode

export interface ModalContainerProps {
  content: ReactNode
}
