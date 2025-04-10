// // import React, { useEffect, useState } from "react";
// // import { Line } from "react-chartjs-2";
// // import axios from "axios";
// // import {
// //   Chart as ChartJS,
// //   LineElement,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // // Register required components
// // ChartJS.register(
// //   LineElement,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   Title,
// //   Tooltip,
// //   Legend
// // );

// // const CgmChart = () => {
// //   const [cgmData, setCgmData] = useState([]); // Dummy data for testing
// //   const fetchData = async () => {
// //     try {
// //       const response = await fetch("/api/cgm-reading", {
// //         method: "GET",
// //         headers: { "Content-Type": "application/json" },
// //       });
// //       const data = await response.json();

// //       setCgmData(data);
// //     } catch (error) {
// //       console.log(error.message);
// //       console.error("Error fetching CGM data", error);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchData();
// //     // const interval = setInterval(fetchData, 5000); // Fetch data every 5 sec

// //     // return () => clearInterval(interval);
// //   }, []);

// //   const data = {
// //     labels: cgmData.map((entry) => entry.sampleNumber),
// //     datasets: [
// //       {
// //         label: "CGM Reading",
// //         data: cgmData.map((entry) => entry.reading),
// //         borderColor: "blue",
// //         borderWidth: 2,
// //         fill: false,
// //         tension: 0.4,
// //       },
// //     ],
// //   };

// //   const options = {
// //     responsive: true,
// //     scales: {
// //       x: { title: { display: true, text: "Sample Number" } },
// //       y: { title: { display: true, text: "CGM Reading" } },
// //     },
// //   };

// //   return <Line data={data} options={options} />;
// // };

// // export default CgmChart;
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
//   const [cgmData, setCgmData] = useState([])
//   const [chartData, setChartData] = useState([]);

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
//       console.log(data)
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
//       console.error('Error fetching readings:', error.message);
//     }
//   };
//   const fetchData = async () => {
//         try {
//           const response = await fetch("/api/cgm-reading", {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//           });
//           const data = await response.json();
//           // console.log(data)
//           setChartData(data);
//         } catch (error) {
//           console.log(error.message)
//           console.error("Error fetching CGM data", error);
//         }
//       };
//   useEffect(() => {
//     fetchData();
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
//         responsive: true,
//         scales: {
//           x: { title: { display: true, text: "Sample Number" } },
//           y: { title: { display: true, text: "CGM Reading" } },
//         },
//       };
//       const data2 = {
//             labels: chartData.map((entry) => entry.sampleNumber),
//             datasets: [
//               {
//                 label: "CGM Reading",
//                 data: chartData.map((entry) => entry.reading),
//                 borderColor: "blue",
//                 borderWidth: 2,
//                 fill: false,
//                 tension: 0.4,
//               },
//             ],
//           };
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
//         {data2? (
//           <Line data={data2} options={options} />
//         ) : (
//           <p className="no-data">No data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CgmChart; 