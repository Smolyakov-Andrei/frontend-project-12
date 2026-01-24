import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext.jsx'

const SignUpPage = () => {
  const { t } = useTranslation()
  const auth = useAuth()
  const navigate = useNavigate()
  const [registrationFailed, setRegistrationFailed] = useState(false)
  const usernameRef = useRef(null)

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const validationSchema = yup.object().shape({
    username: yup.string()
      .trim()
      .required(t('signup.required'))
      .min(3, t('signup.min3'))
      .max(20, t('signup.max20')),
    password: yup.string()
      .trim()
      .required(t('signup.required'))
      .min(6, t('signup.min6')),
    confirmPassword: yup.string()
      .test('password-match', t('signup.passwordsMustMatch'), function (value) {
        return this.parent.password === value
      }),
  })

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setRegistrationFailed(false)
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        })
        auth.logIn(response.data)
        navigate('/')
      }
      catch (err) {
        setSubmitting(false)
        if (err.isAxiosError && err.response.status === 409) {
          setRegistrationFailed(true)
          usernameRef.current.select()
        }
        else {
          toast.error(t('toast.error.network'))
          console.error(err)
        }
      }
    },
  })

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">{t('signup.header')}</h1>
              <Form onSubmit={f.handleSubmit}>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder={t('signup.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.username}
                    isInvalid={(f.touched.username && !!f.errors.username) || registrationFailed}
                    ref={usernameRef}
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {f.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    placeholder={t('signup.password')}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.password}
                    isInvalid={(f.touched.password && !!f.errors.password) || registrationFailed}
                  />
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {f.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    placeholder={t('signup.confirmPassword')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.confirmPassword}
                    isInvalid={(f.touched.confirmPassword && !!f.errors.confirmPassword) || registrationFailed}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed ? t('signup.alreadyExists') : f.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="outline-primary" className="w-100" disabled={f.isSubmitting}>
                  {t('signup.submit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage
