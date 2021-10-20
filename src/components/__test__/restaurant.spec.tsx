import React from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Restaurant } from '../restaurant';

describe('<Restaurant/>', () => {
  it('renders correctly', () => {
    const restaurantProps = {
      id: '1',
      coverImg: 'x',
      name: 'nameTest',
      categoryName: 'categoryTest',
    };
    const { getByText, container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      'href',
      `/restaurants/${restaurantProps.id}`
    );
  });
});
