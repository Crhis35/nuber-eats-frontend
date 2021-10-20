import React from 'react';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormError } from '../components/form-error';
import { ApolloError, gql, useMutation } from '@apollo/client';
import Logo from '../images/logo.svg';

import { Button } from '../components/button';
import { Link, useHistory } from 'react-router-dom';
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from '../__api__/CreateAccountMutation';
import { Helmet } from 'react-helmet-async';
import { UserRole } from '../__api__/globalTypes';

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccounInput: CreateAccountInput!) {
    createAccount(input: $createAccounInput) {
      ok
      error
    }
  }
`;

const CreateAccount = () => {
  const history = useHistory();
  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.CLIENT,
    },
  });
  const onCompleted = ({ createAccount: { ok } }: CreateAccountMutation) => {
    if (ok) {
      history.push('/');
    }
  };
  const onError = (error: ApolloError) => {
    console.log(error);
  };

  const [createAccount, { data: CreateAccountMutationResult, loading }] =
    useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
      CREATE_ACCOUNT_MUTATION,
      {
        variables: {
          createAccounInput: {
            ...watch(),
          },
        },
        onCompleted,
        onError,
      }
    );
  const onSubmit = (values: ICreateAccountForm) => {
    if (!loading) {
      createAccount();
    }
  };

  return (
    <div className="h-screen">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-xs">
          <div className="bg-white  px-8 pt-6 pb-8 mb-4">
            <img alt="logo" className="w-full mb-6" src={Logo} />
          </div>
          <h4 className="text-center text-gray-500 text-xs uppercase">
            Let's get started
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
                  required: 'Email is requerid',
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
                className="shadow appearance-none border focus:ring-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {CreateAccountMutationResult?.createAccount.error && (
              <FormError
                message={CreateAccountMutationResult?.createAccount.error}
              />
            )}

            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              {...register('role', { required: 'Role is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
            >
              {Object.values(UserRole).map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>

            <div className="flex items-center justify-between">
              <Button
                canClick={isValid}
                loading={loading}
                actionText="Create Account"
              />
              <button className="bg-black"></button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            New to Nuber?
            <Link className="text-blue-500 hover:text-blue-700" to="/">
              LogIn Now?
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

export default CreateAccount;
