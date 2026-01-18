import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="text-center">
    <h1 className="h4 text-muted">404 - Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти <Link to="/">на главную страницу</Link>
    </p>
  </div>
);

export default NotFoundPage;
