import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateLocationInformation from './Partials/UpdateLocationInformationForm';

export default function Edit({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Location</h2>}
        >
            <Head title="Location" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateLocationInformation />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
