import BusinessPanelLayout from '@/Layouts/BusinessPanelLayout';
import { Head } from '@inertiajs/react';

export default function BusinessProfile({ auth }) {
    return (
        <BusinessPanelLayout
            user={auth.user} 
            business={auth.business}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Business Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </BusinessPanelLayout>
    );
}
