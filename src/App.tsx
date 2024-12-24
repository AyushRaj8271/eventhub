// src/App.tsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignupPage from './components/Auth/Signup/Signup';
import LoginPage from './pages/LoginPage';
import AddEventPage from './pages/AddEventPage';
import AllEventsPage from './pages/AllEventPage';
import { fetchEvents } from './redux/eventSlice';
import { AppDispatch } from './redux/store';
import Navbar from './components/Navbar/Navabar';
import { ToastContainer } from 'react-toastify';
import EventDetailsPage from './pages/EventDetailsPage';
import Analytics from './pages/Analytics';
import 'react-toastify/dist/ReactToastify.css';
import AuthRedirect from './components/Redirect/AuthRedirect';



const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <Router>
        <AuthRedirect />
       <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-event" element={<AddEventPage />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/event/:eventId" element={<EventDetailsPage />} />
        <Route path="/analytics" element={<Analytics/>} />
        {/* Add other routes here */}
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;