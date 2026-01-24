import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext.jsx'

const LoginPage = () => {
  const { t } = useTranslation()
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [authFailed, setAuthFailed] = useState(false)
  const usernameField = useRef(null)

  useEffect(() => {
    usernameField.current.focus()
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {
    setAuthFailed(false)
    try {
      const response = await axios.post('/api/v1/login', {
        username: values.username,
        password: values.password,
      })
      auth.logIn(response.data)
      const from = location.state?.from?.pathname || '/'
      navigate(from)
    }
    catch (err) {
      setSubmitting(false)
      if (err.isAxiosError && err.response?.status === 401) {
        setAuthFailed(true)
        usernameField.current.select()
        return
      }
      toast.error(t('toast.error.network'))
      throw err
    }
  }

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <h2>{t('login.header')}</h2>
              </Col>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form as={Col} xs={12} md={6} className="mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">{t('login.header')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        id="username"
                        className={`form-control ${authFailed ? 'is-invalid' : ''}`}
                        placeholder={t('login.username')}
                        required
                        innerRef={usernameField}
                      />
                      <label htmlFor="username">{t('login.username')}</label>
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        name="password"
                        type="password"
                        id="password"
                        className={`form-control ${authFailed ? 'is-invalid' : ''}`}
                        placeholder={t('login.password')}
                        required
                      />
                      <label htmlFor="password">{t('login.password')}</label>
                      {authFailed && <div className="invalid-tooltip">{t('login.authFailed')}</div>}
                    </div>
                    <Button type="submit" disabled={isSubmitting} variant="outline-primary" className="w-100 mb-3">
                      {t('login.submit')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('login.new')}
                  {' '}
                </span>
                <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
