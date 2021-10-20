import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useMe } from '../../hooks/useMe';
import { VerifyEmail, VerifyEmailVariables } from '../../__api__/VerifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = (data: VerifyEmail) => {
    const { verifyEmail } = data;
    if (verifyEmail.ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment User on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push('/');
    }
  };

  const [verifyEmail] = useMutation<VerifyEmail, VerifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );
  // const location = useLocation();
  useEffect(() => {
    const code = window.location.href.split('code=')[1];
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, [verifyEmail]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Helmet>
        <title>Confirm account | Nuber Eats</title>
      </Helmet>
      <h2 className="text-center text-2xl font-bold mb-4">Confirm email...</h2>
      <h4 className="text-center text-lg font-bold mb-4">
        Please wait, don't close this page
      </h4>
    </div>
  );
};

export default ConfirmEmail;
