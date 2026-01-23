import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.jsx';

const LoginPage = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);
  const usernameField = useRef(null);

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setAuthFailed(false);
    try {
      const response = await axios.post('/api/v1/login', {
        username: values.username,
        password: values.password,
      });
      auth.logIn(response.data);
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } catch (err) {
      setSubmitting(false);
      if (err.isAxiosError && err.response?.status === 401) {
        setAuthFailed(true);
        usernameField.current.select();
        return;
      }
      throw err;
    }
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <h2>Войти</h2>
              </Col>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form as={Col} xs={12} md={6} className="mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        id="username"
                        className={`form-control ${authFailed ? 'is-invalid' : ''}`}
                        placeholder="Ваш ник"
                        required
                        innerRef={usernameField}
                      />
                      <label htmlFor="username">Ваш ник</label>
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        name="password"
                        type="password"
                        id="password"
                        className={`form-control ${authFailed ? 'is-invalid' : ''}`}
                        placeholder="Пароль"
                        required
                      />
                      <label htmlFor="password">Пароль</label>
                      {authFailed && <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>}
                    </div>
                    <Button type="submit" disabled={isSubmitting} variant="outline-primary" className="w-100 mb-3">
                      Войти
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
