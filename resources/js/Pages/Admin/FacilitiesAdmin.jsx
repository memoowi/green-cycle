import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, Link } from "@inertiajs/react";
import FacilitiesTable from "./Partials/FacilitiesTable";

export default function FacilitiesAdmin({ auth }) {
    return (
        <AdminPanelLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight select-none">
                    <Link href={route("admin.recycle-facilities")} className="hover:underline">
                        Recycle Facilities
                    </Link>
                </h2>
            }
        >
            <Head title="Recycle Facilities" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <FacilitiesTable />
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanelLayout>
    )
}