import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DogSearchPage from '../pages/DogSearchPage';
import * as React from 'react';

jest.mock('lottie-react', () => () => <div />);

test('renders DogSearchPage without crashing', () => {
  render(<DogSearchPage />, { wrapper: MemoryRouter });
  expect(screen.getByText('Search for Dogs')).toBeInTheDocument();
});
