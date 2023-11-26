import Footer from '@/Layouts/Partials/Footer';
import LandingLayout from '@/Layouts/LandingLayout';
import { Head } from '@inertiajs/react';

export default function DashboardAdmin({ auth }) {
    return (
        <LandingLayout
            user={auth.user}
            header={(
                <div className='md:flex md:justify-between max-w-7xl w-full px-8 pt-20'>
                    <div className='self-center space-y-6 text-white'>
                        <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight">
                            GreenCycle for<br />Everyone
                        </h1>
                        <p className='text-2xl'>Turning Waste into a Greener Tomorrow!</p>
                    </div>
                    <img src={'/images/home1.svg'} className="md:w-1/2 mt-10 md:mt-4" />
                </div>
                )}
        >
            <Head title="GreenCycle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">The latest from GreenCycle</div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Services</div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Type of Waste | Popular Items</div>
                    </div>
                </div>
            </div>

            <Footer />
        </LandingLayout>
    );
}
