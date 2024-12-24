// src/components/EventCard/EventCard.tsx

import React, { forwardRef } from 'react';
import { Event } from '../../redux/eventSlice';

interface EventCardProps {
  event: Event;
  onClick: (eventId: string) => void;
}

const EventCard: React.ForwardRefRenderFunction<HTMLDivElement, EventCardProps> = ({ event, onClick }, ref) => {
  return (
    <div ref={ref} className="flex p-4 mb-4 bg-white rounded-lg shadow-md">
      <img src={event.image_folder_path} alt={event.event_name} className="w-24 h-24 rounded-lg mr-4" />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{event.event_name}</h2>
          <p className="text-sm text-gray-600">
            <i className="fas fa-calendar-alt mr-1"></i>
            {new Date(event.start_date_time).toLocaleDateString()} at {new Date(event.start_date_time).toLocaleTimeString()} - {new Date(event.end_date_time).toLocaleTimeString()} on {event.venue.city}, {event.venue.state}
          </p>
          <p className="text-sm text-gray-600">Tickets from ${event.ticket_price}</p>
          <p className="text-sm text-gray-600">{event.short_description}</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => onClick(event.id!)}
            className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Tickets & Details
          </button>
          {event.isRegistered ? (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" className="ml-4" style={{ fill: '#40C057' }}>
              <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" className="ml-4" style={{ fill: '#FF0000' }}>
              <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(EventCard);
