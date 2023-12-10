import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, usePage } from "@inertiajs/react";
import UsersDoughnutCharts from "./Partials/UsersDoughnutCharts";
import BusinessDoughnutCharts from "./Partials/BusinessDoughnutCharts";
import ReportsCharts from "./Partials/ReportsCharts";
import BarCompletedChart from "./Partials/BarCompletedChart";

export default function DashboardAdmin({ auth }) {
    const users = usePage().props.auth.users;
    const businesses = usePage().props.auth.businesses;
    const reportsAdmin = usePage().props.auth.reportsAdmin;
    return (
        <AdminPanelLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8">
                            <div className="grid grid-cols-12 mb-10 gap-6">
                                <div className="col-span-6 lg:col-span-3">
                                    <div className="p-4 h-full flex flex-col justify-center bg-emerald-600 text-white border-2 border-emerald-700 shadow-[-8px_10px_0_0_rgba(0,0,0)] dark:shadow-[-8px_10px_0_0_rgb(71,85,105)]">
                                        <h2 className="font-semibold text-lg leading-tight">
                                            Total Users :
                                        </h2>
                                        <p className="font-semibold text-4xl leading-tight">
                                            {users.length}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <div className="p-4 h-full flex flex-col justify-center bg-yellow-600 text-white border-2 border-yellow-700 shadow-[-8px_10px_0_0_rgba(0,0,0)] dark:shadow-[-8px_10px_0_0_rgb(71,85,105)]">
                                        <h2 className="font-semibold text-lg leading-tight">
                                            Total Business :
                                        </h2>
                                        <p className="font-semibold text-4xl leading-tight">
                                            {businesses.length}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <div className="p-4 h-full flex flex-col justify-center bg-fuchsia-600 text-white border-2 border-fuchsia-700 shadow-[-8px_10px_0_0_rgba(0,0,0)] dark:shadow-[-8px_10px_0_0_rgb(71,85,105)]">
                                        <h2 className="font-semibold text-lg leading-tight">
                                            Total Orders :
                                        </h2>
                                        <p className="font-semibold text-4xl leading-tight">
                                            {reportsAdmin.length}
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
                                                reportsAdmin.filter(
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
                                        Users Account Type :
                                    </h2>
                                    <div className="w-2/3 mx-auto">
                                        <UsersDoughnutCharts data={users} />
                                    </div>
                                </div>
                                <div className="p-4 col-span-6">
                                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                        Business / Facilities Status :
                                    </h2>
                                    <div className="w-2/3 mx-auto">
                                        <BusinessDoughnutCharts
                                            data={businesses}
                                        />
                                    </div>
                                </div>
                                <div className="p-4 col-span-6">
                                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                        Recycled Reports :
                                    </h2>
                                    <div className="flex justify-center md:w-2/3 mx-auto">
                                        <ReportsCharts data={reportsAdmin} />
                                    </div>
                                </div>
                                <div className="p-4 col-span-6">
                                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                        Daily Completed Reports :
                                    </h2>
                                    <div className="flex justify-center w-full">
                                        <BarCompletedChart
                                            data={reportsAdmin}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanelLayout>
    );
}
