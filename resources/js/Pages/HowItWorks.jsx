import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link } from "@inertiajs/react";
import CTA from "@/Components/CTA";

export default function HowItWorks({ auth }) {
    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center h-screen bg-emerald-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                            <h1 className="flex items-center gap-5 text-4xl font-bold uppercase tracking-widest">
                                <svg
                                    className="w-16 h-20 fill-current shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                >
                                    <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                </svg>
                                Pick Up
                            </h1>
                            <div className="w-5/12 h-1 bg-emerald-600 mt-4 mb-8"></div>
                            <div className="md:grid grid-cols-2 text-lg">
                                <ol className="list-decimal p-6">
                                    <li>Set Up Pick up Location</li>
                                    <li>Choose Items</li>
                                    <li>Upload Photo of Items</li>
                                    <li>Choose Payment Method</li>
                                    <li>Picking Up Process</li>
                                </ol>
                                <div>
                                    <CTA
                                        // href={route("recycle-item")}
                                        className="bg-emerald-600 hover:bg-emerald-700"
                                    >
                                        Get Started
                                    </CTA>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-80 h-80 absolute bottom-20 right-20 rounded-[4rem] border-8 border-dashed border-emerald-700 animate-[spin_12s_linear_infinite]"></div>
                    <div className=" w-60 h-60 absolute top-10 left-20 rounded-[4rem] border-8 border-dashed border-emerald-700 animate-[spin_10s_linear_infinite]"></div>
                    <div className=" w-56 h-56 absolute bottom-20 left-20 rounded-[4rem] border-8 border-dashed border-emerald-700 animate-[spin_14s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute top-20 right-20 rounded-[3rem] border-8 border-dashed border-emerald-700 animate-[spin_9s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute top-10 rounded-[3rem] border-8 border-dashed border-emerald-700 animate-[spin_7s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute bottom-20 rounded-[3rem] border-8 border-dashed border-emerald-700 animate-[spin_11s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute bottom-10 right-20 rounded-[3rem] border-8 border-dashed border-emerald-700 animate-[spin_13s_linear_infinite]"></div>
                </div>
            }
        >
            <Head title="Recycle an Item" />
            <section>
                <div className="relative flex justify-center items-center h-[90vh] sm:h-screen bg-cyan-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                            <h1 className="flex items-center gap-5 text-4xl font-bold uppercase tracking-widest">
                                <svg
                                    className="w-16 h-20 fill-current shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                >
                                    <path d="M80 48a48 48 0 1 1 96 0A48 48 0 1 1 80 48zm64 193.7v65.1l51 51c7.1 7.1 11.8 16.2 13.4 26.1l15.2 90.9c2.9 17.4-8.9 33.9-26.3 36.8s-33.9-8.9-36.8-26.3l-14.3-85.9L66.8 320C54.8 308 48 291.7 48 274.7V186.6c0-32.4 26.2-58.6 58.6-58.6c24.1 0 46.5 12 59.9 32l47.4 71.1 10.1 5V160c0-17.7 14.3-32 32-32H384c17.7 0 32 14.3 32 32v76.2l10.1-5L473.5 160c13.3-20 35.8-32 59.9-32c32.4 0 58.6 26.2 58.6 58.6v88.1c0 17-6.7 33.3-18.7 45.3l-79.4 79.4-14.3 85.9c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l15.2-90.9c1.6-9.9 6.3-19 13.4-26.1l51-51V241.7l-19 28.5c-4.6 7-11 12.6-18.5 16.3l-59.6 29.8c-2.4 1.3-4.9 2.2-7.6 2.8c-2.6 .6-5.3 .9-7.9 .8H256.7c-2.5 .1-5-.2-7.5-.7c-2.9-.6-5.6-1.6-8.1-3l-59.5-29.8c-7.5-3.7-13.8-9.4-18.5-16.3l-19-28.5zM2.3 468.1L50.1 348.6l49.2 49.2-37.6 94c-6.6 16.4-25.2 24.4-41.6 17.8S-4.3 484.5 2.3 468.1zM512 0a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm77.9 348.6l47.8 119.5c6.6 16.4-1.4 35-17.8 41.6s-35-1.4-41.6-17.8l-37.6-94 49.2-49.2z" />
                                </svg>
                                Drop Off
                            </h1>
                            <div className="w-5/12 h-1 bg-cyan-600 mt-4 mb-8"></div>
                            <div className="md:grid grid-cols-2 text-lg">
                                <ol className="list-decimal p-6">
                                    <li>Pick a Recycle Facility Point</li>
                                    <li>Choose Items to Recycle</li>
                                    <li>Choose Payment Method</li>
                                    <li>Confirmation and Payment</li>
                                </ol>
                                <div>
                                    <CTA
                                        // href={route("recycle-item")}
                                        className="bg-cyan-600 hover:bg-cyan-700"
                                    >
                                        Recycle Now
                                    </CTA>
                                </div>
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
            </section>
            <section>
                <div className="relative flex justify-center items-center h-[90vh] sm:h-screen bg-yellow-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                            <h1 className="flex items-center gap-5 text-4xl font-bold uppercase tracking-widest">
                                <svg
                                    className="w-16 h-16 fill-current shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M174.7 45.1C192.2 17 223 0 256 0s63.8 17 81.3 45.1l38.6 61.7 27-15.6c8.4-4.9 18.9-4.2 26.6 1.7s11.1 15.9 8.6 25.3l-23.4 87.4c-3.4 12.8-16.6 20.4-29.4 17l-87.4-23.4c-9.4-2.5-16.3-10.4-17.6-20s3.4-19.1 11.8-23.9l28.4-16.4L283 79c-5.8-9.3-16-15-27-15s-21.2 5.7-27 15l-17.5 28c-9.2 14.8-28.6 19.5-43.6 10.5c-15.3-9.2-20.2-29.2-10.7-44.4l17.5-28zM429.5 251.9c15-9 34.4-4.3 43.6 10.5l24.4 39.1c9.4 15.1 14.4 32.4 14.6 50.2c.3 53.1-42.7 96.4-95.8 96.4L320 448v32c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-64-64c-9.4-9.4-9.4-24.6 0-33.9l64-64c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2v32l96.2 0c17.6 0 31.9-14.4 31.8-32c0-5.9-1.7-11.7-4.8-16.7l-24.4-39.1c-9.5-15.2-4.7-35.2 10.7-44.4zm-364.6-31L36 204.2c-8.4-4.9-13.1-14.3-11.8-23.9s8.2-17.5 17.6-20l87.4-23.4c12.8-3.4 26 4.2 29.4 17L182 241.2c2.5 9.4-.9 19.3-8.6 25.3s-18.2 6.6-26.6 1.7l-26.5-15.3L68.8 335.3c-3.1 5-4.8 10.8-4.8 16.7c-.1 17.6 14.2 32 31.8 32l32.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32.2 0C42.7 448-.3 404.8 0 351.6c.1-17.8 5.1-35.1 14.6-50.2l50.3-80.5z" />
                                </svg>
                                Open Recycle Facility
                            </h1>
                            <div className="w-5/12 h-1 bg-yellow-600 mx-auto mt-4 mb-8"></div>
                            <p className="text-center text-lg">
                            Start your own recycling facility and lead the way towards a greener future. Make a positive impact on the environment by transforming waste into valuable resources. Champion sustainability and inspire others to join the movement for a cleaner world. Open your recycle facility and be a catalyst for positive change.
                            </p>
                            <div className="flex justify-center mt-10">
                                <CTA
                                    // href={route("recycle-item")}
                                    className="bg-yellow-600 hover:bg-yellow-700"
                                >
                                    Start Your Recycle Facility Now
                                </CTA>
                            </div>
                        </div>
                    </div>
                    <div className=" w-80 h-80 absolute bottom-20 right-20 rounded-[4rem] border-8 border-dashed border-yellow-700 animate-[spin_12s_linear_infinite]"></div>
                    <div className=" w-60 h-60 absolute top-10 left-20 rounded-[4rem] border-8 border-dashed border-yellow-700 animate-[spin_10s_linear_infinite]"></div>
                    <div className=" w-56 h-56 absolute bottom-20 left-20 rounded-[4rem] border-8 border-dashed border-yellow-700 animate-[spin_14s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute top-20 right-20 rounded-[3rem] border-8 border-dashed border-yellow-700 animate-[spin_9s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute top-10 rounded-[3rem] border-8 border-dashed border-yellow-700 animate-[spin_7s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute bottom-20 rounded-[3rem] border-8 border-dashed border-yellow-700 animate-[spin_11s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute bottom-10 right-20 rounded-[3rem] border-8 border-dashed border-yellow-700 animate-[spin_13s_linear_infinite]"></div>
                </div>
            </section>
            <Footer />
        </LandingLayout>
    );
}
