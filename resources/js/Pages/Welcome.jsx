import LandingLayout from '@/Layouts/LandingLayout';
import { Head } from '@inertiajs/react';

export default function DashboardAdmin({ auth }) {
    return (
        <LandingLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight text-center">Home</h2>}
        >
            <Head title="GreenCycle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Welcome!</div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
