import NewButton from "@/Components/NewButton";
import BusinessPanelLayout from "@/Layouts/BusinessPanelLayout";
import { Head, Link } from "@inertiajs/react";
import BusinessItemsForm from "./Partials/BusinessItemsForm";

export default function BusinessItems({ auth }) {
    return (
        <BusinessPanelLayout
            user={auth.user}
            business={auth.business}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    <Link
                        href={route("business.items")}
                        className="hover:underline"
                    >
                        Items
                    </Link>
                </h2>
            }
        >
            <Head title="Business Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <BusinessItemsForm />
                        </div>
                    </div>
                </div>
            </div>
        </BusinessPanelLayout>
    );
}
