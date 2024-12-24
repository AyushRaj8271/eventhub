// src/components/Navbar/Navbar.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../Navbar/Navabar';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: Router });
};

describe('Navbar Component', () => {
  test('renders Navbar component', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  test('displays Create Event and Analytics links when not on auth pages', () => {
    renderWithRouter(<Navbar />, { route: '/' });
    expect(screen.getByText('Create Event')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  test('does not display Create Event and Analytics links on login page', () => {
    renderWithRouter(<Navbar />, { route: '/login' });
    expect(screen.queryByText('Create Event')).not.toBeInTheDocument();
    expect(screen.queryByText('Analytics')).not.toBeInTheDocument();
  });

  test('does not display Create Event and Analytics links on signup page', () => {
    renderWithRouter(<Navbar />, { route: '/signup' });
    expect(screen.queryByText('Create Event')).not.toBeInTheDocument();
    expect(screen.queryByText('Analytics')).not.toBeInTheDocument();
  });

  test('handles logout correctly', () => {
    renderWithRouter(<Navbar />, { route: '/' });
    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);
    expect(localStorage.getItem('token')).toBeNull();
    expect(window.location.pathname).toBe('/login');
  });
});
