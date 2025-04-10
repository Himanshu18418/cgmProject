// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import './CgmChart.css';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CgmChart = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: []
//   });

//   const fetchReadings = async (sortBy, order, month, date) => {
//     try {
//       let url = '/api/v1/readings?';
//       const params = new URLSearchParams();
      
//       if (sortBy) params.append('sortBy', sortBy);
//       if (order) params.append('order', order);
//       if (month !== 'All Months') params.append('month', month);
//       if (date !== 'All Dates') params.append('date', date);
      
//       url += params.toString();

//       const { data } = await axios.get(url);
      
//       setChartData({
//         labels: data.map(item => {
//           const date = new Date(item.timestamp);
//           return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
//         }),
//         datasets: [
//           {
//             label: 'CGM Reading',
//             data: data.map(item => item.reading),
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//           }
//         ]
//       });
//     } catch (error) {
//       console.error('Error fetching readings:', error);
//     }
//   };

//   useEffect(() => {
//     fetchReadings('timestamp', 'asc', 'All Months', 'All Dates');
//   }, []);

//   const handleFilterChange = (e) => {
//     const sortBy = document.getElementById('sortBy').value;
//     const order = document.getElementById('order').value;
//     const month = document.getElementById('month').value;
//     const date = document.getElementById('date').value;
    
//     fetchReadings(sortBy, order, month, date);
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'CGM Readings Over Time'
//       }
//     }
//   };

//   return (
//     <div className="timeline-container">
//       <div className="filter-row">
//         <select id="sortBy" onChange={handleFilterChange} className="filter-select">
//           <option value="timestamp">Sort by Date</option>
//           <option value="sampleNumber">Sort by Sample Number</option>
//         </select>

//         <select id="order" onChange={handleFilterChange} className="filter-select">
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>

//         <select id="month" onChange={handleFilterChange} className="filter-select">
//           <option>All Months</option>
//           {Array.from({ length: 12 }, (_, i) => (
//             <option key={i + 1} value={i + 1}>
//               {new Date(0, i).toLocaleString('default', { month: 'long' })}
//             </option>
//           ))}
//         </select>

//         <select id="date" onChange={handleFilterChange} className="filter-select">
//           <option>All Dates</option>
//           {Array.from({ length: 31 }, (_, i) => (
//             <option key={i + 1} value={i + 1}>{i + 1}</option>
//           ))}
//         </select>
//       </div>

//       <div className="chart-container">
//         {chartData.labels.length > 0 ? (
//           <Line data={chartData} options={options} />
//         ) : (
//           <p className="no-data">No data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CgmChart; 