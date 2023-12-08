import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, usePage } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function WaitList({ auth }) {
    const pickupWaitList = usePage().props.auth.pickupWaitList;
    // console.log(pickupWaitList);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        };
        return new Date(dateTimeString).toLocaleDateString("en-US", options);
    };

    const calculateTotalApproxEarn = (order) => {
        const pickupItems = order.pickupitem; 
        // console.log(pickupItems);
        return pickupItems.reduce(
            (total, item) => total + (item.approx_earn || 0),
            0
        );
    };
    
    

    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center bg-emerald-600">
                    <div className="max-w-7xl w-full pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 w-full text-gray-800 dark:text-gray-200">
                            <div className="flex justify-center items-center h-16 gap-2">
                                <NavLink
                                    href={route("order.waitlist")}
                                    active={route().current("order.waitlist")}
                                    className="h-3/4 px-3 rounded border-4"
                                >
                                    <span>WaitList</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="My Orders" />
            <section className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center">
                    <div className="bg-white dark:bg-slate-700 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                        <div className="p-8 space-y-6">
                            {pickupWaitList.map((order) => (
                                <div
                                    key={order.id}
                                    className="border-2 border-slate-500"
                                >
                                    <div className="grid grid-cols-5 border-b-2 border-slate-500 p-4">
                                        <div className="col-span-3 self-center">
                                            <h3 className="uppercase font-bold text-lg">
                                                Order ID : P - {order.id}
                                            </h3>
                                            <p className="text-sm">
                                                Order Date:{" "}
                                                {formatDateTime(
                                                    order.created_at
                                                )}
                                            </p>
                                        </div>
                                        <div className="col-span-2 flex flex-col justify-between items-end">
                                            <p className="text-sm italic">
                                                {order.status == 1 && "Pending"}
                                                {order.status == 3 && "Accepted"}
                                            </p>
                                            <div className="text-end">
                                                <span className="text-sm">
                                                    Approx. earn
                                                </span>
                                                <p className="text-lg font-bold">
                                                Rp. {calculateTotalApproxEarn(order)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-end gap-2">
                                        <button
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                                            type="button"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                            type="button"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </LandingLayout>
    );
}
