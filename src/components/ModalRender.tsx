import { type FC, useState } from 'react'
import type { ModalProps } from '../hocs/withCallModal'

function ModalRender({
  modal,
}: {
  modal: {
    component: FC<ModalProps>
    open: boolean
    id: string
  }
}) {
  const [isOpen, setIsOpen] = useState(true)

  const handleSetOpen = (open: boolean) => {
    setIsOpen(open)
  }

  return <modal.component open={isOpen} setOpen={handleSetOpen} />
}

export default ModalRender
