import React, { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto';

const BarCompletedChart = ({ data }) => {
    const chartRef = useRef();
    const [dailyCompletionData, setDailyCompletionData] = useState([]);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Group orders by completion date and count completed orders for each day
        const groupedByDate = data.reduce((acc, report) => {
            const completionDate = report.completed_at ? new Date(report.completed_at) : null;

            if (completionDate) {
                // Format the date as "MMM D"
                const formattedDate = `${completionDate.toLocaleString('default', { month: 'short' })} ${completionDate.getDate()}`;
                acc[formattedDate] = (acc[formattedDate] || 0) + 1;
            }

            return acc;
        }, {});

        // Create an array of objects with date and count properties
        const chartData = Object.entries(groupedByDate).map(([date, count]) => ({
            date,
            count,
        }));

        setDailyCompletionData(chartData);
    }, [data]);

    useEffect(() => {
        // Cleanup previous chart instance
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a bar chart
        const ctx = chartRef.current.getContext("2d");

        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: dailyCompletionData.map((data) => data.date),
                datasets: [
                    {
                        label: "Daily Completed Orders",
                        data: dailyCompletionData.map((data) => data.count),
                        backgroundColor: "rgba(75, 192, 192, 0.8)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
                        hoverBorderColor: "rgba(75, 192, 192, 1)",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Number of Completed Orders",
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Date",
                        },
                    },
                },
            },
        });

        // Cleanup chart on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [dailyCompletionData]);

    return <canvas className="w-full" ref={chartRef} />;
};

export default BarCompletedChart;
