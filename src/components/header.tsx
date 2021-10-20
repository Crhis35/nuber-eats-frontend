import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import Logo from '../images/logo.svg';
// Build a header with search bar and logo and a button to open the menu with tailwindcss classes

const Header: React.FC = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="text-3xl tracking-widest">Loading...</span>
      </div>
    );
  }
  return (
    <>
      {!data.me.verified && (
        <div className="bg-red-500 p-3 text-center text-xs text-white">
          <span className="text-xl tracking-widest">
            You need to verify your email address
          </span>
        </div>
      )}
      <header className="flex items-center justify-between flex-wrap  p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <img className="fill-current w-52 mr-2" src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Docs
            </Link>
            <Link
              to="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Examples
            </Link>
            <Link
              to="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Blog
            </Link>
          </div>
          <div>
            <Link
              to="/edit-profile"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-900 border-gray-900 hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0"
            >
              <FontAwesomeIcon icon={faUser} />
              {data.me.email.split('@')[0]}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
