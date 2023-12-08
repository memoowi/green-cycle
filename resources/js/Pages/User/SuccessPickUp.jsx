import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, usePage } from "@inertiajs/react";
import NextButton from "@/Components/NextButton";

export default function ChoosePaymentPickUp({ auth }) {
    const pickUpId = usePage().props.pickUpId;
    // console.log(pickUpId);

    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center py-16 bg-emerald-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                            <div className="flex justify-center">
                                <div className="">
                                    <h2 className="text-2xl font-bold uppercase tracking-wide">
                                        Choose Payment Method
                                    </h2>
                                    <div className="w-full h-1 bg-emerald-600 my-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Pick Up" />
            <section className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center">
                    <div className=" -mt-24 z-10 bg-white dark:bg-slate-700 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                        WWW
                    </div>
                </div>
            </section>
            <Footer />
        </LandingLayout>
    );
}
