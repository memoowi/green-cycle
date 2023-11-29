import { Head } from '@inertiajs/react';
import UpdateLocationInformation from './Partials/UpdateLocationInformationForm';
import LandingLayout from '@/Layouts/LandingLayout';

export default function Edit({ auth }) {
    return (
        <LandingLayout
            user={auth.user}
            header={(
                <div className='mt-16'>
                </div>
            )}
        >
            <Head title="Edit Location" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateLocationInformation />
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
