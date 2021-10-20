import React from 'react';

interface IFormErrorProps {
  message: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ message }) => {
  return (
    <p role="alert" className="text-red-500 text-xs italic">
      {message}
    </p>
  );
};
