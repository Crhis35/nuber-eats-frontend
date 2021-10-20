import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ME_QUERY } from '../../hooks/useMe';
import Header from '../header';

describe('<Header/>', () => {
  it('should renders verified banner', async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: '1',
                    email: '',
                    verified: false,
                    role: '',
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(
        getByText('You need to verify your email address')
      ).toBeInTheDocument();
    });
  });
  it('should renders without verified banner', async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: '1',
                    email: '',
                    verified: true,
                    role: '',
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(queryByText('You need to verify your email address')).toBeNull();
    });
  });
});
