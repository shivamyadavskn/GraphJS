import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const EventTypeChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const eventTypes = data.reduce((acc, item) => {
    acc[item.event_type] = (acc[item.event_type] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(eventTypes),
        datasets: [{
          label: 'Event Types',
          data: Object.values(eventTypes),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
          x: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [data]);

  return (
    <div className="w-full md:w-1/2 p-4">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default EventTypeChart;