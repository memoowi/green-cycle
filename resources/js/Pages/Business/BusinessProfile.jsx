import BusinessPanelLayout from '@/Layouts/BusinessPanelLayout';
import { Head } from '@inertiajs/react';
import EditProfileForm from './Partials/EditProfileForm';

export default function BusinessProfile({ auth }) {
    return (
        <BusinessPanelLayout
            user={auth.user}
            business={auth.business}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Business Profile</h2>}
        >
            <Head title="Business Profile" />

            <div className="py-12">
                <EditProfileForm />
            </div>
        </BusinessPanelLayout>
    );
}
