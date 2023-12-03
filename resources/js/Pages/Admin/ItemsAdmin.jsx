import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, Link } from "@inertiajs/react";
import ItemsTable from "./Partials/ItemsTable";

export default function ItemsAdmin({ auth }) {
    return (
        <AdminPanelLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight select-none">
                    <Link href={route("admin.items")}>
                        Items
                    </Link>
                </h2>
            }
        >
            <Head title="Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-4 w-fit">
                    <Link href={route("admin.items.create")}>
                        <span className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md">
                            <svg
                                className="fill-current group-hover:animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="14"
                                viewBox="0 0 448 512"
                            >
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                            New Items
                        </span>
                    </Link>
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
