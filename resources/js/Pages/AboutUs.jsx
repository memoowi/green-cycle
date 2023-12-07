import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link } from "@inertiajs/react";

export default function AboutUs({ auth }) {
    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center h-screen bg-[url('/images/about-us.jpg')] bg-cover bg-center">
                    <div className="group max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <h1 className="text-5xl sm:text-6xl lg:text-9xl drop-shadow-2xl blur-md invert -translate-x-6 translate-y-6 text-center font-bold uppercase tracking-widest text-white group-hover:scale-110 group-hover:invert-0 transition duration-500 ease-in-out">
                            GreenCycle
                        </h1>
                        <h1 className="absolute text-5xl sm:text-6xl lg:text-9xl drop-shadow-2xl blur-sm -translate-x-3 translate-y-3 text-center font-bold uppercase tracking-widest text-emerald-600 group-hover:scale-110 group-hover:-hue-rotate-90 transition duration-500 ease-in-out">
                            GreenCycle
                        </h1>
                        <h1 className="absolute text-5xl sm:text-6xl lg:text-9xl drop-shadow-2xl text-center font-bold uppercase tracking-widest text-white group-hover:scale-110 transition duration-500 ease-in-out">
                            GreenCycle
                        </h1>
                    </div>
                </div>
            }
        >
            <Head title="Recycle an Item" />
            <section className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="sm:w-3/4 p-8 mx-auto text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold">About Us</h1>
                            <div className="w-5/12 h-1 bg-emerald-600 my-4"></div>
                            <p className="text-lg leading-relaxed tracking-wide">
                            Welcome to GreenCycle, where sustainability meets innovation. At GreenCycle, we are on a mission to revolutionize the way we approach recycling. Our commitment is rooted in the belief that every small effort contributes to a greener planet.
                                GreenCycle is a web application that allows
                                users to recycle waste items. Users can choose
                                from a variety of waste items and choose the
                                nearest recycler to pick up the item. The
                                recycler will pay the user for the item.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="sm:w-3/4 p-8 mx-auto text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold">Our Vision</h1>
                            <div className="w-5/12 h-1 bg-emerald-600 my-4"></div>
                            <p className="text-lg leading-relaxed tracking-wide">
                            We envision a world where waste is seen as an opportunity, not a problem. GreenCycle strives to be at the forefront of environmental stewardship, fostering a global community dedicated to responsible recycling practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="sm:w-3/4 p-8 mx-auto text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold">What We Do</h1>
                            <div className="w-5/12 h-1 bg-emerald-600 my-4"></div>
                            <p className="text-lg leading-relaxed tracking-wide">
                            GreenCycle is not just a website; it's a platform that empowers individuals, businesses, and communities to make a positive impact. Through cutting-edge technology, educational resources, and a user-friendly interface, we simplify the recycling process, making it accessible to all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="sm:w-3/4 p-8 mx-auto text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold">Join Us on the Green Journey</h1>
                            <div className="w-5/12 h-1 bg-emerald-600 my-4"></div>
                            <p className="text-lg leading-relaxed tracking-wide">
                            Whether you're an individual looking to recycle responsibly or a business striving for sustainable practices, GreenCycle is your partner in the green journey. Together, let's create a world where recycling is not just a choice but a way of life. Join us at GreenCycle and be a part of the solution. Green today, green tomorrow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </LandingLayout>
    );
}
