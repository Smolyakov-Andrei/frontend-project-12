import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSocket } from '../contexts/SocketContext.jsx'
import { closeModal } from '../slices/modalSlice.js'
import { setCurrentChannel } from '../slices/channelsSlice.js'
import filter from '../utils/filter.js'
import { getChannelSchema } from '../utils/validationSchemas.js'

const Add = () => {
  const { t } = useTranslation()
  const { createNewChannel } = useSocket()
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels.channels)
  const channelNames = channels.map(c => c.name)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = async ({ name }, { setSubmitting }) => {
    const cleanName = filter.clean(name)
    try {
      const data = await createNewChannel(cleanName)
      dispatch(setCurrentChannel(data.id))
      toast.success(t('toast.success.add'))
      dispatch(closeModal())
    }
    catch {
      setSubmitting(false)
    }
  }

  const f = useFormik({
    initialValues: { name: '' },
    validationSchema: getChannelSchema(channelNames, t),
    onSubmit: handleSubmit,
  })

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              isInvalid={f.touched.name && f.errors.name}
              name="name"
              id="name"
              className="mb-2"
            />
            <Form.Label htmlFor="name" className="visually-hidden">{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{f.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>
              {t('modals.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={f.isSubmitting}>
              {t('modals.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Add
