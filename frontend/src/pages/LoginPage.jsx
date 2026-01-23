import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <h2>Войти</h2>
              </div>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        id="username"
                        className={`form-control ${authFailed ? 'is-invalid' : ''}`}
                        placeholder="Ваш ник"
                        required
                        innerRef={usernameField} // Привязываем ref
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
                    <button type="submit" disabled={isSubmitting} className="w-100 mb-3 btn btn-outline-primary">
                      Войти
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
