import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
// import db from '../../../../backend/firebaseConfig'; 
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
const [error, setError] = useState('');


  // const fetchData = async () => {
  //   try {
  //     let url = 'http://localhost:2000/api/readings?';
  //     const params = new URLSearchParams();
      
  //     if (sortBy) params.append('sortBy', sortBy);
  //     if (selectedMonth) params.append('month', selectedMonth);
  //     if (selectedDate) params.append('date', selectedDate);
  //     params.append('order', sortOrder);
      
  //     url += params.toString();

  //     const response = await axios.get(url);
  //     setData(response.data);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error('Error fetching data:', error.message);
  //       console.error('Response:', error.response?.data);
  //     } else {
  //       console.error('Unexpected error:', error);
  //     }
  //     console.error('Error fetching data:', error);
  //   }
  // };
 
  // const fetchData = async () => {
  //   try {
  //     // Extract token from document.cookie
  //     const getCookie = (name) => {
  //       const value = `; ${document.cookie}`;
  //       const parts = value.split(`; ${name}=`);
  //       if (parts.length === 2) return parts.pop().split(';').shift();
  //     };
  
  //     const token = getCookie('token'); // Make sure the cookie is named 'token'
  //     console.log(token)
  //     let url = 'http://localhost:2000/api/readings?';
  //     const params = new URLSearchParams();
  
  //     if (sortBy) params.append('sortBy', sortBy);
  //     if (selectedMonth) params.append('month', selectedMonth);
  //     if (selectedDate) params.append('date', selectedDate);
  //     params.append('order', sortOrder);
  
  //     url += params.toString();
  
  //     const headers = {};
  //     if (token) {
  //       headers['Authorization'] = `Bearer ${token}`;
  //     }
  
  //     const response = await axios.get(url, { headers });
  //     setData(response.data);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error('Error fetching data:', error.message);
  //       console.error('Response:', error.response?.data);
  //     } else {
  //       console.error('Unexpected error:', error);
  //     }
  //   }
  // };
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
  
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };
  
      const token = getCookie('token');
      let url = 'http://localhost:2000/api/readings?';
      const params = new URLSearchParams();
  
      if (sortBy) params.append('sortBy', sortBy);
      if (selectedMonth) params.append('month', selectedMonth);
      if (selectedDate) params.append('date', selectedDate);
      params.append('order', sortOrder);
  
      url += params.toString();
  
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      const response = await axios.get(url, { headers });
      setData(response.data);
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [sortBy, selectedMonth, selectedDate, sortOrder]);

  // const chartData = {
  //   labels: data.map(item => {
  //     const date = new Date(item.timestamp);
  //     return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  //   }),
  //   datasets: [
  //     {
  //       label: 'CGM Readings',
  //       data: data.map(item => item.reading),
  //       fill: false,
  //       borderColor: 'rgb(75, 192, 192)',
  //       tension: 0.1
  //     }
  //   ]
  // };
  const validData = data.filter(item => item.reading !== null && item.reading !== undefined && item.reading !== '');

const allDates = validData.map(item => item.date.split(',')[0].trim());
const isSameDate = allDates.every(date => date === allDates[0]);

const chartData = {
  labels: validData.map(item => {
    const [date, time] = item.date.split(',');
    return isSameDate ? time.trim() : item.date;
  }),
  datasets: [
    {
      label: 'CGM Readings',
      data: validData.map(item => item.reading),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'CGM Readings Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Reading Value'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    }
  };

  return (
    <div className="graph-container">
      <div className="filters">
        {/* <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="timestamp">Sort by Date</option>
          <option value="sampleNumber">Sort by Sample Number</option>
        </select> */}

        {/* <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)}
          className="filter-select"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select> */}

        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="filter-select"
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        <select 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
          className="filter-select"
        >
          <option value="">All Dates</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      {/* {data.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No data available</p>
      )} */}
      {loading ? (
  <p>Loading...</p>
) : error ? (
  <p>{error}</p>
) : validData.length > 0 ? (
  <Line data={chartData} options={options} />
) : (
  <p>No data available for selected filters</p>
)}


    </div>
  );
};

export default Graph;
