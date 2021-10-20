import React from 'react';

interface ButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<ButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <button
      // disabled={!canClick}
      role="button"
      className={` ${
        !canClick
          ? `bg-gray-500 pointer-events-none`
          : `bg-lime-500 hover:bg-lime-700`
      } w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
    >
      {loading ? 'Loading...' : actionText}
    </button>
  );
};
