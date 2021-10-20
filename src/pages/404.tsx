import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Helmet>
        <title>Not found | Nuber Eats</title>
      </Helmet>
      <div className="text-center text-gray-500 text-xl font-bold">
        <h1 className="text-6xl text-gray-800">404</h1>
        <h2 className="text-3xl text-gray-800">Page not found</h2>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  );
};

export default NotFound;
