import React, { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement } from "chart.js/auto"; // Import "arc" element explicitly

Chart.register(DoughnutController, ArcElement);

const TakenOrderDoughnutCharts = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Declined Orders", "Completed Orders"],
                datasets: [
                    {
                        data: [
                            data.filter((order) => order.status === 4).length, 
                            data.filter((order) => order.status === 6).length, 
                        ],
                        backgroundColor: [
                            "rgba(244,63,94, 1)",
                            "rgba(5, 150, 105, 1)",
                        ],
                        hoverOffset: 20,
                        hoverBackgroundColor: [
                            "rgba(244,63,94, 0.6)",
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

export default TakenOrderDoughnutCharts;
