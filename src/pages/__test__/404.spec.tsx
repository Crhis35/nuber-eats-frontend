import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../404';

describe('<404/>', () => {
  it('should render', async () => {
    render(
      <Router>
        <HelmetProvider>
          <NotFound />
        </HelmetProvider>
      </Router>
    );
    await waitFor(() => {
      expect(document.title).toBe('Not found | Nuber Eats');
    });
  });
});
