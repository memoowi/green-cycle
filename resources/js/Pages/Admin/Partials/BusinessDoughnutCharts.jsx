import React, { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement } from "chart.js/auto"; // Import "arc" element explicitly

Chart.register(DoughnutController, ArcElement);

const BusinessDoughnutCharts = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Active Facilities", "Inactive Facilities"],
                datasets: [
                    {
                        data: [
                            data.filter((business) => business.status === 1).length, 
                            data.filter((business) => business.status === 0).length, 
                        ],
                        backgroundColor: [
                            "rgba(8, 145, 178, 1)",
                            "rgba(225, 29, 72, 1)",
                        ],
                        hoverOffset: 20,
                        hoverBackgroundColor: [
                            "rgba(8, 145, 178, 0.6)",
                            "rgba(225, 29, 72, 0.6)",
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

export default BusinessDoughnutCharts;
