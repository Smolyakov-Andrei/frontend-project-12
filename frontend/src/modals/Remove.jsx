import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSocket } from '../contexts/SocketContext.jsx'
import { closeModal } from '../slices/modalSlice.js'
import { removeChannel } from '../slices/channelsSlice.js'

const Remove = () => {
  const { t } = useTranslation()
  const { deleteExistingChannel } = useSocket()
  const dispatch = useDispatch()
  const { item } = useSelector(state => state.modal)
  const [isSubmitting, setSubmitting] = useState(false)

  const handleDelete = async () => {
    setSubmitting(true)
    try {
      await deleteExistingChannel(item.id)
      dispatch(removeChannel(item.id))
      toast.success(t('toast.success.remove'))
      dispatch(closeModal())
    } 
    catch (e) {
      setSubmitting(false)
    }
  }

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isSubmitting}>
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Remove
