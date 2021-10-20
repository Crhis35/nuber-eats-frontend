import React from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormError } from '../components/form-error';
import { ApolloError, gql, useMutation } from '@apollo/client';
import Logo from '../images/logo.svg';

import {
  LoginMutation,
  LoginMutationVariables,
} from '../__api__/LoginMutation';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { authToken, isLoggedInVar } from '../apollo';
import { LOCAL_STORAGE_TOKEN } from '../contants';

interface ILoginForm {
  email: string;
  password: string;
}

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($logInInput: LogInInput!) {
    login(input: $logInInput) {
      token
      ok
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      isLoggedInVar(true);
      authToken(token);
    }
  };
  const onError = (error: ApolloError) => {
    console.log(error);
  };

  const [login, { data: LoginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    variables: {
      logInInput: {
        email: watch('email'),
        password: watch('password'),
      },
    },
    onCompleted,
    onError,
  });
  const onSubmit = (values: ILoginForm) => {
    if (!loading) {
      login();
    }
  };

  return (
    <div className="h-screen">
      <Helmet>
        <title>Log In | Nuber Eats</title>
      </Helmet>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-xs">
          <div className="bg-white  px-8 pt-6 pb-8 mb-4">
            <img alt="logo" className="w-full mb-6" src={Logo} />
          </div>
          <h4 className="text-center text-gray-500 text-xs uppercase">
            Welcome back!
          </h4>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border focus:ring-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                })}
              />

              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <FormError message={message} />}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className="shadow appearance-none border focus:ring-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="password"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <FormError message={message} />}
              />
            </div>
            {LoginMutationResult?.login.error && (
              <FormError message={LoginMutationResult?.login.error} />
            )}
            <div className="flex items-center justify-between">
              <Button canClick={isValid} loading={loading} actionText="Login" />
            </div>
          </form>
          <div className="flex items-center justify-between">
            New to Nuber?
            <Link
              className="text-blue-500 hover:text-blue-700"
              to="/create-account"
            >
              Create new account?
            </Link>
          </div>
          <p className="text-center text-gray-500 text-xs">
            &copy;2021 Nuber Eats. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
