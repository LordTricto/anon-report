import {} from "chart.js";

import {
  ArcElement,
  CategoryScale,
  Chart,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef, useState } from "react";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const ChartCanva = ({ dataArray, keyArray }) => {
  return (
    <Doughnut
      data={{
        labels: keyArray,
        datasets: [
          {
            fill: true,
            label: "# of votes",
            data: dataArray,
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
          },
        ],
      }}
      // height="100%"
      // width={600}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        // scales: {
        //   x: {
        //     type: "time",
        //     time: {
        //       unit: "month",
        //     },
        //   },
        //   y: {
        //     beginAtZero: true,
        //     grid: {
        //       display: false,
        //     },
        //     ticks: {
        //       // stepSize: 50000004517,
        //       // beginAtZero: true,
        //       // Include a dollar sign in the ticks
        //       callback: function (value, index, values) {
        //         return "$" + value;
        //       },
        //       gridLines: {
        //         display: false,
        //       },
        //     },
        //   },
        // },
        // plugins: {
        //   legend: {
        //     display: false,
        //     // labels: {
        //     //   fontSize: 25,
        //     // },
        //   },
        // },
      }}
    />
  );
};

export default ChartCanva;
