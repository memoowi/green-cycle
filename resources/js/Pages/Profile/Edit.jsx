import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link } from '@inertiajs/react';
import UpdateProfilePhoto from './Partials/UpdateProfilePhotoForm';
import SwitchAccountType from './Partials/SwitchAccountTypeForm';
import UpdateLinkForm from './Partials/UpdateLinkForm';
import LandingLayout from '@/Layouts/LandingLayout';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <LandingLayout
            user={auth.user}
            header={(
                <div className='bg-white dark:bg-slate-900 shadow pt-16'></div>
                )}
        >
            <Head title="Profile" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='text-end px-4 sm:px-0'>
                        <Link
                            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                            href={route('user.profile', auth.user.id)}
                        >
                            Show your profile
                        </Link>
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-600 shadow sm:rounded-lg">
                        <UpdateProfilePhoto 
                        className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-600 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-600 shadow sm:rounded-lg">
                        <UpdateLinkForm
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-600 shadow sm:rounded-lg">
                        <SwitchAccountType
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-600 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-600 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
