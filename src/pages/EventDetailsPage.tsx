import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Map from '../components/Map/Map';
import { updateEventRegistration } from '../redux/eventSlice';
import EventCard from '../components/EventCard/EventCard';
import EventDetailCard from '../components/EventDetailCard/EventDetailCard';

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = useSelector((state: RootState) => state.events.events.find(e => e.id === eventId));
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch = useDispatch<AppDispatch>();
  const [isRegistered, setIsRegistered] = useState(event?.isRegistered || false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(true);
  const [isWhenWhereExpanded, setIsWhenWhereExpanded] = useState(true);

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleRegister = async () => {
    try {
      await dispatch(updateEventRegistration({ eventId: event.id!, isRegistered: true }));
      setIsRegistered(true);
      toast.success('Successfully registered');
    } catch (error) {
      toast.error('Failed to register');
    }
  };

  const handleWatchVideo = () => {
    window.open(event.video_url, '_blank');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const end = new Date(endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${start} - ${end}`;
  };

  return (
    <div className="container mx-auto p-4">
      {/* Event Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <img
          src={event.image_folder_path}
          alt={event.event_name}
          className="col-span-2 w-full h-64 object-cover mb-4 lg:mb-0"
          style={{ height: '540px' }}
        />
        <div className="col-span-1">
          <Map lat={event.venue.lat} lng={event.venue.long} />
          <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-md">
            <button
              onClick={() => setIsWhenWhereExpanded(!isWhenWhereExpanded)}
              className="w-full text-left text-lg font-semibold flex justify-between items-center"
            >
              WHEN & WHERE
              {isWhenWhereExpanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 11 L 7 11 L 7 13 L 17 13 L 17 11 L 13 11 L 13 11 L 11 11 z"></path>
                </svg>
              )}
            </button>
            {isWhenWhereExpanded && (
              <div className="mt-2">
                <p className="text-gray-700">
                  {event.venue.address1}, {event.venue.city}, {event.venue.state}, {event.venue.zipCode}, {event.venue.country}
                </p>
                <p className="text-gray-700">
                  {new Date(event.start_date_time).toLocaleString()} - {new Date(event.end_date_time).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What's About Event */}
      <div className="mb-4">
        <div className="w-full text-left text-lg font-semibold text-blue-800">WHAT'S ABOUT EVENT</div>
        {isAboutExpanded && <p className="mt-2 text-gray-700">{event.description}</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5 mb-4">
        <button
          onClick={handleRegister}
          disabled={isRegistered}
          className={`p-2 ${isRegistered ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded`}
        >
          {isRegistered ? 'Registered' : 'Register'}
        </button>
        <button onClick={handleWatchVideo} className="p-2 bg-blue-500 text-white rounded">
          Watch Video
        </button>
      </div>

      {/* Event Detail Card */}
      <EventDetailCard
        date={formatDate(event.start_date_time)}
        time={formatTime(event.start_date_time, event.end_date_time)}
        title={event.event_name}
        description={event.short_description}
        speakers={event.speaker.split(',')}
      />

      {/* Related Events */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-blue-800">YOU MAY LIKE</h2>
        <div className="flex overflow-x-auto space-x-4">
          {events.map((singleEvent, index) => (
            <div key={index} className="w-full sm:w-1/3 flex-shrink-0">
              <EventCard event={singleEvent} onClick={(eventId) => console.log(eventId)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
