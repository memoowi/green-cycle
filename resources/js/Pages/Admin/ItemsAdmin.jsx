import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, Link } from "@inertiajs/react";
import ItemsTable from "./Partials/ItemsTable";
import NewButton from "@/Components/NewButton";

export default function ItemsAdmin({ auth }) {
    return (
        <AdminPanelLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight select-none">
                    <Link href={route("admin.items")} className="hover:underline">
                        Items
                    </Link>
                </h2>
            }
        >
            <Head title="Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4 w-fit">
                        <NewButton 
                            href={route("admin.items.create")} 
                            value="New Item"
                        />
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ItemsTable />
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanelLayout>
    );
}
