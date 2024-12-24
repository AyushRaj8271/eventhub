// src/pages/AllEventsPage.tsx

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, Event } from '../redux/eventSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import EventCard from '../components/EventCard/EventCard';

const AllEventsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: any) => state.events.events);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    let filtered = events.slice(); // Create a copy of the array
    if (category !== 'All') {
      filtered = filtered.filter((event: Event) => event.category === category);
    }
    if (searchTerm) {
      filtered = filtered.filter((event: Event) =>
        event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOrder === 'asc') {
      filtered.sort((a: Event, b: Event) => a.ticket_price - b.ticket_price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a: Event, b: Event) => b.ticket_price - a.ticket_price);
    }
    setFilteredEvents(filtered);
    setVisibleEvents(filtered.slice(0, 12));
    setPage(1);
  }, [events, category, searchTerm, sortOrder]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleViewModeChange = (mode: string) => {
    setViewMode(mode);
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const lastEventElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleEvents.length < filteredEvents.length) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [visibleEvents, filteredEvents]);

  useEffect(() => {
    const newVisibleEvents = filteredEvents.slice(0, page * 12);
    setVisibleEvents(newVisibleEvents);
  }, [page, filteredEvents]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={() => handleCategoryChange('All')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            All
          </button>
          <button
            onClick={() => handleCategoryChange('Festival')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Festival
          </button>
          <button
            onClick={() => handleCategoryChange('Conference')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Conference
          </button>
          <button
            onClick={() => handleCategoryChange('Playground')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Playground
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
          <input
            type="text"
            placeholder="Search by Event Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border rounded w-full md:w-auto"
          />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="">Sort by</option>
            <option value="asc">Sort Ascending</option>
            <option value="desc">Sort Descending</option>
          </select>
          <button
            onClick={() => handleViewModeChange('grid')}
            className={`px-4 py-2 border rounded ${viewMode === 'grid' ? 'bg-gray-300' : ''}`}
          >
            Grid
          </button>
          <button
            onClick={() => handleViewModeChange('list')}
            className={`px-4 py-2 border rounded ${viewMode === 'list' ? 'bg-gray-300' : ''}`}
          >
            List
          </button>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'list-view'}>
        {visibleEvents.map((event: Event, index: number) => {
          if (visibleEvents.length === index + 1) {
            return <EventCard ref={lastEventElementRef} key={event.id} event={event} onClick={handleEventClick} />;
          } else {
            return <EventCard key={event.id} event={event} onClick={handleEventClick} />;
          }
        })}
      </div>
    </div>
  );
};

export default AllEventsPage;
