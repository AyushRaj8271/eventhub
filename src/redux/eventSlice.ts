// src/redux/eventSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/events";

export interface Venue {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  lat: number;
  long: number;
}

export interface Event {
  id?: string;
  event_name: string;
  tagline: string;
  email: string;
  phone_number: string;
  start_date_time: string;
  end_date_time: string;
  organizer: string;
  organizer_details: string;
  speaker: string;
  video_url: string;
  venue: Venue;
  short_description: string;
  image_folder_path: string;
  ticket_price: number;
  description: string;
  category: string;
  isRegistered: boolean;
}

interface EventState {
  events: Event[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk<Event[]>(
  "events/fetchEvents",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Async thunk to add a new event
export const addEvent = createAsyncThunk<Event, Event>(
  "events/addEvent",
  async (newEvent, { dispatch }) => {
    const response = await axios.post(API_URL, newEvent);
    dispatch(fetchEvents());
    return response.data;
  }
);

// Async thunk to update event registration status
export const updateEventRegistration = createAsyncThunk<
  Event,
  { eventId: string; isRegistered: boolean }
>("events/updateEventRegistration", async ({ eventId, isRegistered }) => {
  const response = await axios.patch(`${API_URL}/${eventId}`, { isRegistered });
  return response.data;
});

const initialState: EventState = {
  events: [],
  status: "idle",
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.status = "succeeded";
          state.events = action.payload;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.events.push(action.payload);
      })
      .addCase(
        updateEventRegistration.fulfilled,
        (state, action: PayloadAction<Event>) => {
          const index = state.events.findIndex(
            (event) => event.id === action.payload.id
          );
          if (index !== -1) {
            state.events[index] = action.payload;
          }
        }
      );
  },
});

export default eventSlice.reducer;
