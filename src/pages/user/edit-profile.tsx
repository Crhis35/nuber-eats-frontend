import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { useMe } from '../../hooks/useMe';
import { EditProfile, EditProfileVariables } from '../../__api__/EditProfile';
import { Helmet } from 'react-helmet-async';

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

const EditProfileView = () => {
  const { data: userData, refetch } = useMe();
  // const client = useApolloClient();
  const onCompleted = async (data: EditProfile) => {
    if (data.editProfile.ok && userData) {
      const { email: prevEmail } = userData.me;
      const { email: newEmail } = getValues();

      if (prevEmail !== newEmail) {
        // client.writeFragment({
        //   id: `User:${userData.me.id}`,
        //   fragment: gql`
        //     fragment EditedUser on User {
        //       verified
        //       email
        //     }
        //   `,
        //   data: {
        //     verified: false,
        //     email: newEmail,
        //   },
        // });
        await refetch();
      }
    }
  };
  const [editProfile, { loading }] = useMutation<
    EditProfile,
    EditProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });

  const { register, handleSubmit, getValues } = useForm<IFormProps>({
    mode: 'onChange',
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onSubmit = (data: IFormProps) => {
    editProfile({
      variables: {
        input: data,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h1 className="text-2xl text-center">Edit Profile</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register('email')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              placeholder="Jane"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              {...register('password')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>
        <Button loading={loading} canClick={!loading} actionText="Save" />
      </form>
    </div>
  );
};

export default EditProfileView;
