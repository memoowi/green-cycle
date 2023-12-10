import React, { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement } from "chart.js/auto"; // Import "arc" element explicitly

Chart.register(DoughnutController, ArcElement);

const OutgoingDoughnutCharts = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Current Accepted Orders", "OTW Orders"],
                datasets: [
                    {
                        data: [
                            data.filter((order) => order.status === 3).length, 
                            data.filter((order) => order.status === 5).length, 
                        ],
                        backgroundColor: [
                            "rgba(132,204,22, 1)",
                            "rgba(14,165,233, 1)",
                        ],
                        hoverOffset: 20,
                        hoverBackgroundColor: [
                            "rgba(132,204,22, 0.6)",
                            "rgba(14,165,233, 0.6)",
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

export default OutgoingDoughnutCharts;
