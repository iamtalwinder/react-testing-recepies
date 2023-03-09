import { render, fireEvent, screen } from '@testing-library/react';
import Form from '../Form';

describe('[Testing user interactions] Form Component Tests', () => {
  test('renders input fields for username and email', () => {
    render(<Form />);
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  test('validates that username and email are required', () => {
    render(<Form />);
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByTestId('username-error')).toHaveTextContent('Username is required');
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
  });

  test('validates email format', () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is invalid');
  });

  test('submits form with valid data', () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'JohnDoe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'johndoe@example.com' } });
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByTestId('submitted-value')).toHaveTextContent('Username: JohnDoe, Email: johndoe@example.com');
  });
});
