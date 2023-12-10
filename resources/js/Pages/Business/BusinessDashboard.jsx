import BusinessPanelLayout from "@/Layouts/BusinessPanelLayout";
import { Head, usePage } from "@inertiajs/react";
import OutgoingDoughnutCharts from "./Partials/outgoingCharts";
import TakenOrderDoughnutCharts from "./Partials/takenOrderCharts";

export default function BusinessProfile({ auth }) {
    const businessItems = usePage().props.auth.businessItems;
    const outgoingPickups = usePage().props.auth.outgoingPickups;
    const takenOrders = usePage().props.auth.takenOrders;

    return (
        <BusinessPanelLayout
            user={auth.user}
            business={auth.business}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Business Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 ">
                            <div className="grid grid-cols-12 mb-10 gap-6">
                                <div className="col-span-6 lg:col-span-3">
                                    <div className="p-4 h-full flex flex-col justify-center bg-emerald-600 text-white border-2 border-emerald-700 shadow-[-8px_10px_0_0_rgba(0,0,0)] dark:shadow-[-8px_10px_0_0_rgb(71,85,105)]">
                                        <h2 className="font-semibold text-lg leading-tight">
                                            Total Items :
                                        </h2>
                                        <p className="font-semibold text-4xl leading-tight">
                                            {businessItems.length}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <div className="p-4 h-full flex flex-col justify-center bg-yellow-600 text-white border-2 border-yellow-700 shadow-[-8px_10px_0_0_rgba(0,0,0)] dark:shadow-[-8px_10px_0_0_rgb(71,85,105)]">
                                        <h2 className="font-semibold text-lg leading-tight">
                                            Outgoing Pickups :
                                        </h2>
                                        <p className="font-semibold text-4xl leading-tight">
                                            {outgoingPickups.length}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <div className="p-4 h-full flex flex-col justify-center bg-fuchsia-600 text-white border-2 border-fuchsia-700 shadow-[-8px_10px_0_0_rgba(0,0,0)] dark:shadow-[-8px_10px_0_0_rgb(71,85,105)]">
                                        <h2 className="font-semibold text-lg leading-tight">
                                            Taken Orders :
                                        </h2>
                                        <p className="font-semibold text-4xl leading-tight">
                                            {takenOrders.length}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <div className="p-4 h-full flex flex-col justify-center bg-blue-600 text-white border-2 border-blue-700 shadow-[-8px_10px_0_0_rgba(0,0,0)] dark:shadow-[-8px_10px_0_0_rgb(71,85,105)]">
                                        <h2 className="font-semibold text-lg leading-tight">
                                            Completed Orders :
                                        </h2>
                                        <p className="font-semibold text-4xl leading-tight">
                                            {
                                                takenOrders.filter(
                                                    (order) =>
                                                        order.status === 6
                                                ).length
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:grid grid-cols-12">
                                <div className="p-4 col-span-6">
                                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                        Outgoing Pickups :
                                    </h2>
                                    <div className="w-2/3 mx-auto">
                                        <OutgoingDoughnutCharts
                                            data={outgoingPickups}
                                        />
                                    </div>
                                </div>
                                <div className="p-4 col-span-6">
                                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                        Taken Orders :
                                    </h2>
                                    <div className="w-2/3 mx-auto">
                                        <TakenOrderDoughnutCharts
                                            data={takenOrders}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BusinessPanelLayout>
    );
}
