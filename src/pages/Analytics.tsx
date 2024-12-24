// src/pages/Analytics.tsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Event } from '../redux/eventSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format, isAfter, isBefore } from 'date-fns';
import html2canvas from 'html2canvas';


interface BarData {
  month: number;
  count: number;
}

const Analytics: React.FC = () => {
  const events: Event[] = useSelector((state: RootState) => state.events.events);
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [barData, setBarData] = useState<BarData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  useEffect(() => {
    const filteredByYear = events.filter((event) =>
      new Date(event.start_date_time).getFullYear().toString() === year
    );
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      count: 0,
    }));
    filteredByYear.forEach((event) => {
      const month = new Date(event.start_date_time).getMonth();
      months[month].count += 1;
    });
    setBarData(months);
  }, [year, events]);

  useEffect(() => {
    let filtered = events.filter((event) =>
      new Date(event.start_date_time).getFullYear().toString() === year
    );

    if (selectedMonth !== null) {
      filtered = filtered.filter(
        (event) => new Date(event.start_date_time).getMonth() + 1 === selectedMonth
      );
    }

    if (searchText) {
      filtered = filtered.filter(
        (event) =>
          event.description.toLowerCase().includes(searchText.toLowerCase()) ||
          event.event_name.toLowerCase().includes(searchText.toLowerCase()) ||
          event.venue.city.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((event) => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [year, selectedMonth, searchText, selectedCategory, events]);

  const handleYearChange = (newYear: string) => {
    setYear(newYear);
    setSelectedMonth(null); // Reset the selected month when the year changes
  };

  const resetFilters = () => {
    setSearchText('');
    setSelectedCategory('All');
    setSelectedMonth(null);
  };

  const downloadBarChart = () => {
    const input = document.getElementById('barChart');
    if (!input) return;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'barchart.png';
      link.click();
    });
  };

  const downloadCSV = () => {
    const csvData = filteredEvents.map((event) => ({
      ID: event.id,
      Title: event.event_name,
      Description: event.description,
      Date: format(new Date(event.start_date_time), 'MM/dd/yyyy'),
      Location: event.venue.city,
      Organizer: event.organizer || '',
      Type: event.category,
      Status: isAfter(new Date(event.start_date_time), new Date()) ? 'Upcoming' : 'Completed',
    }));

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      Object.keys(csvData[0]).join(',') +
      '\n' +
      csvData.map((row) => Object.values(row).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'events.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'eventName', headerName: 'Event Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'startDate', headerName: 'Date', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'organizer', headerName: 'Organizer', width: 150 },
    { field: 'eventType', headerName: 'Type of Event', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  const rows = filteredEvents.map((event) => ({
    id: event.id,
    eventName: event.event_name,
    description: event.description,
    startDate: format(new Date(event.start_date_time), 'MM/dd/yyyy'),
    location: event.venue.city,
    organizer: event.organizer || '',
    eventType: event.category,
    status: isAfter(new Date(event.start_date_time), new Date())
      ? 'Upcoming'
      : 'Completed',
  }));

  return (
    <div className="container mx-auto p-4">
      <Box mb={4}>
        {/* First Row: Overview, Export Button, Year Picker */}
        <Grid container spacing={2} alignItems="center" direction={{ xs: 'column', sm: 'row' }}>
          <Grid item xs={12} sm={4} textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography variant="h5">Overview</Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign={{ xs: 'center', sm: 'center' }}>
            <Button variant="contained" onClick={downloadBarChart} sx={{ mb: { xs: 2, sm: 0 } }}>
              Export Bar Chart
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} textAlign={{ xs: 'center', sm: 'right' }}>
            <TextField
              select
              value={year}
              onChange={(e) => handleYearChange(e.target.value)}
              label="Select Year"
              variant="outlined"
              sx={{ ml: { sm: 2 }, mt: { xs: 2, sm: 0 } }}
            >
              {[2021, 2022, 2023, 2024].map((year) => (
                <MenuItem key={year} value={year.toString()}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Second Row: Event Counts */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: 'center', md: 'left' }}>Upcoming</Typography>
            <Typography variant="h4" textAlign={{ xs: 'center', md: 'left' }}>
              {filteredEvents.filter((event) => isAfter(new Date(event.start_date_time), new Date())).length}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: 'center', md: 'left' }}>Completed</Typography>
            <Typography variant="h4" textAlign={{ xs: 'center', md: 'left' }}>
              {filteredEvents.filter((event) => isBefore(new Date(event.end_date_time), new Date())).length}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: 'center', md: 'left' }}>Total</Typography>
            <Typography variant="h4" textAlign={{ xs: 'center', md: 'left' }}>
              {filteredEvents.length}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" textAlign={{ xs: 'center', md: 'left' }}>My Events</Typography>
            <Typography variant="h4" textAlign={{ xs: 'center', md: 'left' }}>
              {filteredEvents.filter((event) => event.isRegistered).length}
            </Typography>
          </Grid>
        </Grid>

        {/* Third Row: Bar Graph */}
        <div id="barChart" className="mt-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onClick={(e) => {
                if (e && e.activeLabel !== undefined) {
                  setSelectedMonth(Number(e.activeLabel));
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(tick) => format(new Date(0, tick - 1), 'MMM')}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8">
                {barData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      selectedMonth === index + 1
                        ? '#82ca9d'
                        : '#8884d8'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Event List Section */}
        <Box mt={4}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} lg={3}>
              <Typography variant="h5">Event List</Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <TextField
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <TextField
                select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Festival">Festival</MenuItem>
                <MenuItem value="Conference">Conference</MenuItem>
                <MenuItem value="Playground">Playground</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} lg={3} textAlign={{ xs: 'center', sm: 'right' }}>
              <Button fullWidth variant="contained" onClick={downloadCSV}>
                Export CSV
              </Button>
              <Button fullWidth variant="outlined" onClick={resetFilters} sx={{ mt: 2 }}>
                Reset Filters
              </Button>
            </Grid>
          </Grid>

          {/* Event List Data Grid */}
          <Box mt={2}>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              pageSizeOptions={[10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Analytics;
