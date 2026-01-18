import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginPage = () => {
  const handleSubmit = (values) => {
    // Эта функция будет пустой, как и требовалось в задаче.
    // В будущем здесь будет логика отправки данных на сервер.
    console.log('Попытка входа с данными:', values);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                {/* Можно добавить картинку для красоты */}
                <h2>Войти</h2>
              </div>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleSubmit}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <Field
                      name="username"
                      id="username"
                      className="form-control"
                      placeholder="Ваш ник"
                      required
                    />
                    <label htmlFor="username">Ваш ник</label>
                  </div>
                  <div className="form-floating mb-4">
                    <Field
                      name="password"
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Пароль"
                      required
                    />
                    <label htmlFor="password">Пароль</label>
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                    Войти
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
