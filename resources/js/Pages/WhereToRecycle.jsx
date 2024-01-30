import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link } from "@inertiajs/react";
import CTA from "@/Components/CTA";

export default function WhereToRecycle({ auth }) {
    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center h-[90vh] sm:h-screen bg-cyan-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                            <h1 className="text-4xl text-center font-bold uppercase tracking-widest">
                                Where To Recycle
                            </h1>
                            <div className="w-1/12 h-1 bg-cyan-600 mx-auto mt-4 mb-8"></div>
                            <p className="text-center text-lg">
                                Earn money by recycling items you no longer
                                need. Simply just take your no longer needed
                                items and bring them to our nearest recycler.
                            </p>
                            <div className="flex justify-center mt-10">
                                <CTA
                                    href={route("user.drop-off.choose-facility")}
                                    className="bg-cyan-600 hover:bg-cyan-700"
                                >
                                    Drop Off
                                </CTA>
                            </div>
                        </div>
                    </div>
                    <div className=" w-80 h-80 absolute bottom-20 right-20 rounded-[4rem] border-8 border-dashed border-cyan-700 animate-[spin_12s_linear_infinite]"></div>
                    <div className=" w-60 h-60 absolute top-10 left-20 rounded-[4rem] border-8 border-dashed border-cyan-700 animate-[spin_10s_linear_infinite]"></div>
                    <div className=" w-56 h-56 absolute bottom-20 left-20 rounded-[4rem] border-8 border-dashed border-cyan-700 animate-[spin_14s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute top-20 right-20 rounded-[3rem] border-8 border-dashed border-cyan-700 animate-[spin_9s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute top-10 rounded-[3rem] border-8 border-dashed border-cyan-700 animate-[spin_7s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute bottom-20 rounded-[3rem] border-8 border-dashed border-cyan-700 animate-[spin_11s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute bottom-10 right-20 rounded-[3rem] border-8 border-dashed border-cyan-700 animate-[spin_13s_linear_infinite]"></div>
                </div>
            }
        >
            <Head title="Where to Recycle" />
            <section className="py-12 relative overflow-hidden">
                <div className="w-1/3 h-4 bg-cyan-600"></div>
                <div className="w-2/3 h-4 mt-4 ms-20 bg-cyan-600"></div>
                <div className="max-w-4xl h-[50vh] flex items-center mx-auto mt-40 px-8 bg-white dark:bg-slate-700 overflow-hidden shadow-sm rounded-lg">
                    <div className="z-10 p-6 text-gray-900 dark:text-gray-200 text-4xl font-semibold leading-normal uppercase">
                        Join us to
                        <br /> protect our planet.
                        <span className="block text-xl mt-5 text-cyan-800 dark:text-cyan-500 normal-case">
                            Redefining Waste, Renewing Tomorrow!
                        </span>
                    </div>
                </div>
                <img
                    src="/images/images-1.png"
                    className="absolute top-10 lg:top-20 right-0 md:right-[5%] lg:right-[10%] w-72 h-72 sm:w-96 sm:h-96"
                />
            </section>
            <Footer />
        </LandingLayout>
    );
}
