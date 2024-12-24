// src/pages/AnalyticsPage.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { saveAs } from 'file-saver';
import { Button, Select, MenuItem, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Event } from '../redux/eventSlice'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsPage: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const [year, setYear] = useState(new Date().getFullYear());
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    setFilteredEvents(events.filter(event => new Date(event.start_date_time).getFullYear() === year));
  }, [events, year]);

  const upcomingEvents = filteredEvents.filter(event => new Date(event.start_date_time) > new Date()).length;
  const completedEvents = filteredEvents.filter(event => new Date(event.end_date_time) < new Date()).length;
  const myEvents = filteredEvents.filter(event => event.isRegistered).length;

  const eventCountsByMonth = Array(12).fill(0);
  filteredEvents.forEach(event => {
    const month = new Date(event.start_date_time).getMonth();
    eventCountsByMonth[month]++;
  });

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Events',
        data: eventCountsByMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Events in ${year}`,
      },
    },
  };

  const handleExport = () => {
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    canvas.toBlob(blob => {
      saveAs(blob!, `events_${year}.png`);
    });
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'event_name', headerName: 'Event Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'start_date_time', headerName: 'Date', width: 150 },
    // { field: 'venue', headerName: 'Location', width: 150, valueGetter: (params) => `${params.row.venue.city}, ${params.venue.state}` },
    { field: 'organizer', headerName: 'Organizer', width: 150 },
    { field: 'category', headerName: 'Type of Event', width: 150 },
    // { field: 'status', headerName: 'Status', width: 150, valueGetter: (params) => new Date(params.row.start_date_time) > new Date() ? 'Upcoming' : 'Completed' },
  ];

  return (
    <div className="analytics-page p-4">
      <div className="overview flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Overview</h2>
        <div className="flex items-center">
          <Button variant="contained" onClick={handleExport} className="mr-2">Export</Button>
          <Select value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[2022, 2023, 2024].map(y => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="counts flex justify-around mb-4">
        <div>Upcoming: {upcomingEvents}</div>
        <div>Completed: {completedEvents}</div>
        <div>Total: {upcomingEvents + completedEvents}</div>
        <div>My Events: {myEvents}</div>
      </div>
      <div className="chart mb-4">
        <Bar id="chart" data={data} options={options} />
      </div>
      <div className="event-list">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Event List</h3>
          <div className="flex items-center">
            <TextField label="Search" variant="outlined" className="mr-2" />
            <Select className="mr-2">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="festival">Festival</MenuItem>
              <MenuItem value="conference">Conference</MenuItem>
              <MenuItem value="playground">Playground</MenuItem>
            </Select>
            <Button variant="contained">Export CSV</Button>
          </div>
        </div>
        {/* <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={filteredEvents} columns={columns} pageSize={10} />
        </div> */}
      </div>
    </div>
  );
};

export default AnalyticsPage;