import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

jest.mock('lottie-react', () => {
  return function DummyLottie() {
    return <div>Dummy Lottie Component</div>;
  };
});

test('renders LoginPage without crashing', () => {
  render(
    <Router>
      <LoginPage setAuthenticationStatus={jest.fn()} />
    </Router>
  );
  expect(screen.getByText('Login')).toBeInTheDocument();
});
