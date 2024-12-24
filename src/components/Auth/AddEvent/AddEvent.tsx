// src/components/Auth/AddEvent/AddEvent.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../../redux/eventSlice';
import { AppDispatch } from '../../../redux/store';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  validateEventName,
  validateTagline,
  validateEmail,
  validatePhoneNumber,
  validateStartDateTime,
  validateEndDateTime,
  validateOrganizer,
  validateOrganizerDetails,
  validateSpeaker,
  validateVideoUrl,
  validateVenueAddress1,
  validateCity,
  validateState,
  validateZipCode,
  validateCountry,
  validateLatitude,
  validateLongitude,
  validateTicketPrice,
  validateDescription,
  validateCategory,
} from '../../../utils/validation';

const AddEvent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [eventName, setEventName] = useState('');
  const [tagline, setTagline] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [organizerDetails, setOrganizerDetails] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [venue, setVenue] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    lat: 0,
    long: 0,
  });
  const [shortDescription, setShortDescription] = useState('');
  const [imageFolderPath, setImageFolderPath] = useState('');
  const [ticketPrice, setTicketPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        eventName &&
        tagline &&
        email &&
        phoneNumber &&
        startDateTime &&
        endDateTime &&
        organizer &&
        organizerDetails &&
        speaker &&
        videoUrl &&
        venue.address1 &&
        venue.city &&
        venue.state &&
        venue.zipCode &&
        venue.country &&
        venue.lat &&
        venue.long &&
        shortDescription &&
        imageFolderPath &&
        ticketPrice &&
        description &&
        category
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [
    eventName,
    tagline,
    email,
    phoneNumber,
    startDateTime,
    endDateTime,
    organizer,
    organizerDetails,
    speaker,
    videoUrl,
    venue,
    shortDescription,
    imageFolderPath,
    ticketPrice,
    description,
    category,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    const eventNameError = validateEventName(eventName);
    const taglineError = validateTagline(tagline);
    const emailError = validateEmail(email);
    const phoneNumberError = validatePhoneNumber(phoneNumber);
    const startDateTimeError = validateStartDateTime(startDateTime);
    const endDateTimeError = validateEndDateTime(startDateTime, endDateTime);
    const organizerError = validateOrganizer(organizer);
    const organizerDetailsError = validateOrganizerDetails(organizerDetails);
    const speakerError = validateSpeaker(speaker);
    const videoUrlError = validateVideoUrl(videoUrl);
    const venueAddress1Error = validateVenueAddress1(venue.address1);
    const cityError = validateCity(venue.city);
    const stateError = validateState(venue.state);
    const zipCodeError = validateZipCode(venue.zipCode);
    const countryError = validateCountry(venue.country);
    const latitudeError = validateLatitude(venue.lat);
    const longitudeError = validateLongitude(venue.long);
    const ticketPriceError = validateTicketPrice(ticketPrice);
    const descriptionError = validateDescription(description);
    const categoryError = validateCategory(category);

    if (
      eventNameError ||
      taglineError ||
      emailError ||
      phoneNumberError ||
      startDateTimeError ||
      endDateTimeError ||
      organizerError ||
      organizerDetailsError ||
      speakerError ||
      videoUrlError ||
      venueAddress1Error ||
      cityError ||
      stateError ||
      zipCodeError ||
      countryError ||
      latitudeError ||
      longitudeError ||
      ticketPriceError ||
      descriptionError ||
      categoryError
    ) {
      toast.error(
        eventNameError ||
        taglineError ||
        emailError ||
        phoneNumberError ||
        startDateTimeError ||
        endDateTimeError ||
        organizerError ||
        organizerDetailsError ||
        speakerError ||
        videoUrlError ||
        venueAddress1Error ||
        cityError ||
        stateError ||
        zipCodeError ||
        countryError ||
        latitudeError ||
        longitudeError ||
        ticketPriceError ||
        descriptionError ||
        categoryError
      );
      return;
    }

    const newEvent = {
      event_name: eventName,
      tagline,
      email,
      phone_number: phoneNumber,
      start_date_time: startDateTime,
      end_date_time: endDateTime,
      organizer,
      organizer_details: organizerDetails,
      speaker,
      video_url: videoUrl,
      venue,
      short_description: shortDescription,
      image_folder_path: imageFolderPath,
      ticket_price: ticketPrice,
      description,
      category,
      isRegistered: false, // Add the default value here
    };

    dispatch(addEvent(newEvent));
    toast.success('Event added successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Create Event</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Event Name</label>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Tagline</label>
          <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Start Date and Time</label>
          <input type="datetime-local" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">End Date and Time</label>
          <input type="datetime-local" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Organizer</label>
          <input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Organizer Details</label>
          <input type="text" value={organizerDetails} onChange={(e) => setOrganizerDetails(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Speaker</label>
          <input type="text" value={speaker} onChange={(e) => setSpeaker(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Video URL</label>
          <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Venue Address 1</label>
          <input type="text" value={venue.address1} onChange={(e) => setVenue({ ...venue, address1: e.target.value })} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Venue Address 2</label>
          <input type="text" value={venue.address2} onChange={(e) => setVenue({ ...venue, address2: e.target.value })} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">City</label>
          <input type="text" value={venue.city} onChange={(e) => setVenue({ ...venue, city: e.target.value })} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">State</label>
          <input type="text" value={venue.state} onChange={(e) => setVenue({ ...venue, state: e.target.value })} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Zip Code</label>
          <input type="text" value={venue.zipCode} onChange={(e) => setVenue({ ...venue, zipCode: e.target.value })} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Country</label>
          <input type="text" value={venue.country} onChange={(e) => setVenue({ ...venue, country: e.target.value })} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Latitude</label>
          <input type="number" value={venue.lat} onChange={(e) => setVenue({ ...venue, lat: parseFloat(e.target.value) })} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Longitude</label>
          <input type="number" value={venue.long} onChange={(e) => setVenue({ ...venue, long: parseFloat(e.target.value) })} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Short Description</label>
          <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Image Folder Path</label>
          <input type="text" value={imageFolderPath} onChange={(e) => setImageFolderPath(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Ticket Price</label>
          <input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(parseFloat(e.target.value))} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2 border rounded">
            <option value="">Select Category</option>
            <option value="Conference">Conference</option>
            <option value="Festival">Festival</option>
            <option value="Playground">Playground</option>
          </select>
        </div>
      </div>
      <button type="submit" className="mt-6 w-full p-2 bg-blue-800 text-white rounded hover:bg-blue-900" disabled={!isFormValid}>Save</button>
    </form>
  );
};

export default AddEvent;
