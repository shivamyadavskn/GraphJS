import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const ProtocolChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const protocols = data.reduce((acc, item) => {
    acc[item.proto] = (acc[item.proto] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(protocols),
        datasets: [{
          label: 'Protocols',
          data: Object.values(protocols),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
          ],
        }]
      },
      options: {
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

export default ProtocolChart;