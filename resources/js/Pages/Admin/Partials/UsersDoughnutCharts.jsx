import React, { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement } from "chart.js/auto"; // Import "arc" element explicitly

Chart.register(DoughnutController, ArcElement);

const UsersDoughnutCharts = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Business Account", "Basic Account"],
                datasets: [
                    {
                        data: [
                            data.filter((user) => user.type === 1).length, // Business accounts
                            data.filter((user) => user.type === 0).length, // Basic accounts
                        ],
                        backgroundColor: [
                            "rgba(202, 138, 4, 1)",
                            "rgba(5, 150, 105, 1)",
                        ],
                        hoverOffset: 20,
                        hoverBackgroundColor: [
                            "rgba(202, 138, 4, 0.6)",
                            "rgba(5, 150, 105, 0.6)",
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "60%",
            },
        });
        
    }, [data]);

    return <canvas className="w-full" ref={chartRef} />;
};

export default UsersDoughnutCharts;
