import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import Lottie from "lottie-react";
import animationData from "../../../../public/images/anicon-truck.json";

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
                                        Pick Up Order Success
                                    </h2>
                                    <div className="w-full h-1 bg-emerald-600 my-4"></div>

                                    <p className="text-center italic select-none">Pick-Up Order ID: {pickUpId}</p>
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
                        <div className="p-8">
                            <div className="flex flex-col justify-center items-center text-center">
                                <Lottie
                                    className="w-80 h-80 dark:invert"
                                    animationData={animationData}
                                    loop={true}
                                    autoplay={true}
                                />
                                <p className="text-lg italic">
                                    We will pick up your order asap.
                                </p>
                                <p>
                                    Thank you for using our service. You can check your order status 
                                    <Link
                                        href={route("order.waitlist")}
                                        className="italic hover:underline hover:text-emerald-700"
                                    >
                                        {" "}here
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </LandingLayout>
    );
}
