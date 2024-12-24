import React from 'react';

interface EventDetailCardProps {
  date: string;
  time: string;
  title: string;
  description: string;
  speakers: string[];
}

const EventDetailCard: React.FC<EventDetailCardProps> = ({ date, time, title, description, speakers }) => {
  return (
    <div className="border rounded-lg p-6 mb-6 shadow-md w-full max-w-lg mx-auto lg:max-w-2xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center mb-4">
        <div className="bg-blue-800 text-white p-4 rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg">
          <p className="text-sm">{date}</p>
          <p className="text-lg font-bold">{time}</p>
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-4">
          <h3 className="text-2xl font-semibold text-blue-800">{title}</h3>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-gray-600">
        <strong>Speakers:</strong> {speakers.join(', ')}
      </p>
    </div>
  );
};

export default EventDetailCard;
