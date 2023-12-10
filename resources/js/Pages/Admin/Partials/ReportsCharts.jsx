import { Chart } from "chart.js";
import { useEffect, useRef } from "react";

export default function ReportsCharts({ data }) {
  const orderStatusCounts = {
    Pending: 0,
    Canceled: 0,
    Acceped: 0,
    Declined: 0,
    OTW: 0,
    Completed: 0,
  };

  data.forEach((report) => {
    const status =
      report.status === 2
        ? "Canceled"
        : report.status === 3
        ? "Acceped"
        : report.status === 4
        ? "Declined"
        : report.status === 5
        ? "OTW"
        : report.status === 6
        ? "Completed"
        : "Pending";

    orderStatusCounts[status]++;
  });

  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "polarArea", // Change chart type to polar area
      data: {
        labels: Object.keys(orderStatusCounts),
        datasets: [
          {
            label: "Order Status",
            data: Object.values(orderStatusCounts),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4CAF50",
              "#FF9800",
              "#9C27B0",
            ], hoverOffset: 10, 
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Cleanup on component unmount
    return () => {
      chartInstance.destroy();
    };
  }, [orderStatusCounts]);

  return <canvas className="w-full" ref={chartRef} />;
}
