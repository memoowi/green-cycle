import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head } from "@inertiajs/react";
import ReportsLists from "./Partials/ReportsLists";

export default function RecycledReportsAdmin({auth}) {
    return (
        <AdminPanelLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Recycled Reports</h2>}
        >
            <Head title="Recycled Reports" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <ReportsLists />
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanelLayout>
    );
}