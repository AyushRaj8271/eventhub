// src/components/Auth/Signup/Signup.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './Signup';
import '@testing-library/jest-dom';

describe('Signup Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Signup />
      </Router>
    );
  });

  test('renders Signup form', () => {
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
  });

  test('validates email field', () => {
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  test('validates required fields', () => {
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);

    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Phone Number is required')).toBeInTheDocument();
    expect(screen.getByText('Address is required')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'User' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Test St' } });

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);

    // Assuming the form submission triggers a success message or redirects
    await waitFor(() => expect(screen.getByText('Signup successful')).toBeInTheDocument());
  });

  test('shows password strength indicator', () => {
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'weak' } });

    expect(screen.getByText('Password strength: Weak')).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'Str0ngP@ssword!' } });

    expect(screen.getByText('Password strength: Strong')).toBeInTheDocument();
  });

  test('displays error message on form submission failure', async () => {
    // Mock an API call to simulate a submission failure
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Signup failed' }),
      } as Response)
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'User' } });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Test St' } });

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('Signup failed')).toBeInTheDocument());

    // Clean up mock
    mockFetch.mockRestore();
  });
});
