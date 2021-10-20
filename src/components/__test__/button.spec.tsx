import { render } from '@testing-library/react';
import React from 'react';
import { Button } from '../button';

describe('<Button/>', () => {
  it('should render', () => {
    const { getByText } = render(
      <Button canClick={true} loading={false} actionText="Test" />
    );
    getByText('Test');
    // rerender(<Button canClick={true} loading={true} actionText="Test" />);
    // getByText('Loading...');
  });
  it('should display loading', () => {
    const { getByText, container } = render(
      <Button canClick={false} loading={true} actionText="Test" />
    );
    getByText('Loading...');
    expect(container.firstChild).toHaveClass('pointer-events-none');
  });
});
