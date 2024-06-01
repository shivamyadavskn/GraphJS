import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SeverityChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const severities = data.reduce((acc, item) => {
    if (item.alert) {
      acc[item.alert.severity] = (acc[item.alert.severity] || 0) + 1;
    }
    return acc;
  }, {});

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(severities),
        datasets: [{
          label: 'Severities',
          data: Object.values(severities),
          backgroundColor: [
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
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
    <div className="w-full p-4">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SeverityChart;