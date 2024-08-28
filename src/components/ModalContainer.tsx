'use client'
import React from 'react'
import { useCalledModal } from '../hooks/useCalledModal'

export const ModalContainer: React.FC = () => {
  const { mapModals } = useCalledModal()

  const handleClose = (modal: any) => {
    mapModals.set(modal.id, { ...modal, open: !modal.open })
  }

  return Array.from(mapModals.values()).map((modal) => {
    const Component = modal.component

    return (
      <Component
        key={`modal-${modal.id}`}
        open={modal.open}
        setOpen={() => handleClose(modal)}
        {...modal.props}
      />
    )
  })
}
