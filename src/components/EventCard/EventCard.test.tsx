// src/components/EventCard/EventCard.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventCard from './EventCard';
import { Event } from '../../redux/eventSlice';

const mockEvent: Event = {
  id: '1',
  event_name: 'Test Event',
  tagline: 'Test Tagline',
  email: 'test@example.com',
  phone_number: '1234567890',
  start_date_time: '2023-10-10T10:00:00Z',
  end_date_time: '2023-10-10T12:00:00Z',
  organizer: 'Test Organizer',
  organizer_details: 'Test Organizer Details',
  speaker: 'Test Speaker',
  video_url: 'http://test.com',
  venue: {
    address1: '123 Test St',
    address2: '',
    city: 'Test City',
    state: 'Test State',
    zipCode: '12345',
    country: 'Test Country',
    lat: 12.34,
    long: 56.78,
  },
  short_description: 'Test Short Description',
  image_folder_path: 'http://test.com/image.jpg',
  ticket_price: 100,
  description: 'Test Description',
  category: 'Conference',
  isRegistered: true,
};

const mockOnClick = jest.fn();

describe('EventCard Component', () => {
  beforeEach(() => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);
  });

  test('renders EventCard component', () => {
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Tagline')).toBeInTheDocument();
    expect(screen.getByText('Tickets from $100')).toBeInTheDocument();
    expect(screen.getByText('Test Short Description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Event')).toBeInTheDocument();
  });

  test('displays event details correctly', () => {
    expect(screen.getByText('10/10/2023 at 10:00:00 AM - 12:00:00 PM on Test City, Test State')).toBeInTheDocument();
    expect(screen.getByText('Tickets from $100')).toBeInTheDocument();
    expect(screen.getByText('Test Short Description')).toBeInTheDocument();
  });

  test('calls onClick handler when button is clicked', () => {
    const button = screen.getByText('Tickets & Details');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledWith('1');
  });

  test('displays registered status icon', () => {
    const registeredIcon = screen.getByTestId('registered-icon');
    expect(registeredIcon).toBeInTheDocument();
    expect(registeredIcon).toHaveStyle('fill: #40C057');
  });

  test('displays not registered status icon', () => {
    const notRegisteredEvent = { ...mockEvent, isRegistered: false };
    render(<EventCard event={notRegisteredEvent} onClick={mockOnClick} />);
    const notRegisteredIcon = screen.getByTestId('not-registered-icon');
    expect(notRegisteredIcon).toBeInTheDocument();
    expect(notRegisteredIcon).toHaveStyle('fill: #FF0000');
  });
});
