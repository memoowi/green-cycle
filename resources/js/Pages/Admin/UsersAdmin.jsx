import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head } from "@inertiajs/react";
import UsersTable from "./Partials/UsersTable";

export default function UsersAdmin({auth}) {
    return (
        <AdminPanelLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UsersTable />
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanelLayout>
    );
}