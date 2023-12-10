import BusinessPanelLayout from "@/Layouts/BusinessPanelLayout";
import { Head, usePage } from "@inertiajs/react";
import TakenOrderLists from "./Partials/TakenOrderLists";

export default function TakenOrderHistory({ auth }) {
    return (
        <BusinessPanelLayout
            user={auth.user}
            business={auth.business}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Taken Order History
                </h2>
            }
        >
            <Head title="Taken Order History" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TakenOrderLists />
                        </div>
                    </div>
                </div>
            </div>
        </BusinessPanelLayout>
    );
}
