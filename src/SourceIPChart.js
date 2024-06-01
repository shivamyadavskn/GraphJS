import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SourceIPChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const sourceIPs = data.reduce((acc, item) => {
      acc[item.src_ip] = (acc[item.src_ip] || 0) + 1;
      return acc;
    }, {});

    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(sourceIPs),
        datasets: [{
          label: 'Source IP Addresses',
          data: Object.values(sourceIPs),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
              font: {
                size: 12,
              },
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
          x: {
            ticks: {
              color: 'white',
              font: {
                size: 12,
              },
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
              font: {
                size: 12,
              },
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
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SourceIPChart;