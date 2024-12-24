// src/components/Auth/Signup/Signup.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../components/Auth/Signup/Signup';
import '@testing-library/jest-dom/extend-expect';

describe('Signup Component', () => {
  test('renders Signup form', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
  });

  test('validates email field', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  test('validates password field', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText('Password must have at least 8 characters, one letter, and one number')).toBeInTheDocument();
  });

  test('validates first name field', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const firstNameInput = screen.getByPlaceholderText('First Name');
    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.blur(firstNameInput);

    expect(screen.getByText('First name is required')).toBeInTheDocument();
  });

  test('validates last name field', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const lastNameInput = screen.getByPlaceholderText('Last Name');
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.blur(lastNameInput);

    expect(screen.getByText('Last name is required')).toBeInTheDocument();
  });

  test('validates phone number field', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const phoneNumberInput = screen.getByPlaceholderText('Phone Number');
    fireEvent.change(phoneNumberInput, { target: { value: '123' } });
    fireEvent.blur(phoneNumberInput);

    expect(screen.getByText('Phone number must be 10 digits')).toBeInTheDocument();
  });

  test('validates address field', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const addressInput = screen.getByPlaceholderText('Address');
    fireEvent.change(addressInput, { target: { value: '' } });
    fireEvent.blur(addressInput);

    expect(screen.getByText('Address is required')).toBeInTheDocument();
  });

  test('enables submit button when form is valid', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const phoneNumberInput = screen.getByPlaceholderText('Phone Number');
    const addressInput = screen.getByPlaceholderText('Address');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    expect(submitButton).not.toBeDisabled();
  });
});
