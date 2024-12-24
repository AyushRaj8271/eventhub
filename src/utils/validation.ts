export const validateEmailSignup = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };
  
  export const validatePhoneNumberSignUp = (phoneNumber: string) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

// src/utils/validation.ts

export const validateEventName = (eventName: string) => {
  if (!eventName) {
    return 'Event name is required';
  }
  return '';
};

export const validateTagline = (tagline: string) => {
  if (!tagline) {
    return 'Tagline is required';
  }
  return '';
};

export const validateEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email || !emailRegex.test(email)) {
    return 'Valid email is required';
  }
  return '';
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^\d{10}$/;
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    return 'Valid phone number is required. add 10 digit phone number';
  }
  return '';
};

export const validateStartDateTime = (startDateTime: string) => {
  if (new Date(startDateTime) <= new Date()) {
    return 'Start date and time must be greater than today';
  }
  return '';
};

export const validateEndDateTime = (startDateTime: string, endDateTime: string) => {
  if (new Date(endDateTime) <= new Date(startDateTime)) {
    return 'End date and time must be greater than start date and time';
  }
  return '';
};

export const validateOrganizer = (organizer: string) => {
  if (!organizer) {
    return 'Organizer is required';
  }
  return '';
};

export const validateOrganizerDetails = (organizerDetails: string) => {
  if (!organizerDetails) {
    return 'Organizer details are required';
  }
  return '';
};

export const validateSpeaker = (speaker: string) => {
  if (!speaker) {
    return 'Speaker is required';
  }
  return '';
};

export const validateVideoUrl = (videoUrl: string) => {
  const urlRegex = /^https?:\/\/.+\..+$/;
  if (!videoUrl || !urlRegex.test(videoUrl)) {
    return 'Valid video URL is required';
  }
  return '';
};

export const validateVenueAddress1 = (address1: string) => {
  if (!address1) {
    return 'Venue address 1 is required';
  }
  return '';
};

export const validateCity = (city: string) => {
  if (!city) {
    return 'City is required';
  }
  return '';
};

export const validateState = (state: string) => {
  if (!state) {
    return 'State is required';
  }
  return '';
};

export const validateZipCode = (zipCode: string) => {
  const zipCodeRegex = /^\d+$/;
  if (!zipCode || !zipCodeRegex.test(zipCode)) {
    return 'Zip code should be 6 digits';
  }
  return '';
};

export const validateCountry = (country: string) => {
  if (!country) {
    return 'Country is required';
  }
  return '';
};

export const validateLatitude = (lat: number) => {
  if (!lat) {
    return 'Latitude is required';
  }
  return '';
};

export const validateLongitude = (long: number) => {
  if (!long) {
    return 'Longitude is required';
  }
  return '';
};

export const validateTicketPrice = (ticketPrice: number) => {
  if (!ticketPrice || ticketPrice.toString().length > 3) {
    return 'Ticket price should contain only 3 digits';
  }
  return '';
};

export const validateDescription = (description: string) => {
  if (!description) {
    return 'Description is required';
  }
  return '';
};

export const validateCategory = (category: string) => {
  if (category !== 'Festival' && category !== 'Conference' && category !== 'Playground') {
    return 'Please select a category';
  }
  return '';
};
