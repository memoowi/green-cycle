import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link } from "@inertiajs/react";
import SadIcon from "@/Components/SadIcon";

export default function UserBanned({ auth }) {
    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center h-[90vh] sm:h-screen bg-red-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                            <h1 className="text-4xl text-center font-bold uppercase tracking-widest">
                                You're banned
                            </h1>
                            <div className="w-1/12 h-1 bg-red-600 mx-auto mt-4 mb-8"></div>
                            <SadIcon className='-mt-16 h-60 dark:invert' />
                            <p className="text-center text-lg">
                            Your access to this website has been restricted due to a violation of our guidelines. To appeal or report an error, contact our support team at email address associated. Thank you for your understanding as we work to maintain a safe online environment for all users.
                            </p>
                            <div className="flex justify-center">
                                <Link href={'/'} className="w-2/3 md:w-1/3 text-center mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Banned" />
            <Footer />
        </LandingLayout>
    );
}
