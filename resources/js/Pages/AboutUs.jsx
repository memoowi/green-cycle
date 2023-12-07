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
            <section className="py-12 group">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="sm:w-3/4 p-8 mx-auto text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold flex items-center gap-4">
                                About Us
                                <svg
                                    className="w-8 h-8 fill-current group-hover:translate-x-40 transition duration-500 ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
                                </svg>
                            </h1>
                            <div className="w-5/12 h-1 bg-emerald-600 my-4"></div>
                            <p className="text-lg leading-relaxed tracking-wide">
                                Welcome to GreenCycle, where sustainability
                                meets innovation. At GreenCycle, we are on a
                                mission to revolutionize the way we approach
                                recycling. Our commitment is rooted in the
                                belief that every small effort contributes to a
                                greener planet. GreenCycle is a web application
                                that allows users to recycle waste items. Users
                                can choose from a variety of waste items and
                                choose the nearest recycler to pick up the item.
                                The recycler will pay the user for the item.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-12 group">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="sm:w-3/4 p-8 mx-auto text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold flex items-center gap-4">Our Vision <svg
                            className="w-8 h-8 fill-current group-hover:translate-x-40 transition duration-500 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                        >
                            <path d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
                        </svg></h1>
                            <div className="w-5/12 h-1 bg-emerald-600 my-4"></div>
                            <p className="text-lg leading-relaxed tracking-wide">
                                We envision a world where waste is seen as an
                                opportunity, not a problem. GreenCycle strives
                                to be at the forefront of environmental
                                stewardship, fostering a global community
                                dedicated to responsible recycling practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-12 group">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="sm:w-3/4 p-8 mx-auto text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold flex items-center gap-4">What We Do<svg
                            className="w-8 h-8 fill-current group-hover:translate-x-40 transition duration-500 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                        >
                            <path d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
                        </svg></h1>
                            <div className="w-5/12 h-1 bg-emerald-600 my-4"></div>
                            <p className="text-lg leading-relaxed tracking-wide">
                                GreenCycle is not just a website; it's a
                                platform that empowers individuals, businesses,
                                and communities to make a positive impact.
                                Through cutting-edge technology, educational
                                resources, and a user-friendly interface, we
                                simplify the recycling process, making it
                                accessible to all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-12 group">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="sm:w-3/4 p-8 mx-auto text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold flex items-center gap-4">
                                Join Us on the Green Journey
                                <svg
                                    className="w-8 h-8 fill-current group-hover:translate-x-40 transition duration-500 ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
                                </svg>
                            </h1>
                            <div className="w-5/12 h-1 bg-emerald-600 my-4"></div>
                            <p className="text-lg leading-relaxed tracking-wide">
                                Whether you're an individual looking to recycle
                                responsibly or a business striving for
                                sustainable practices, GreenCycle is your
                                partner in the green journey. Together, let's
                                create a world where recycling is not just a
                                choice but a way of life. Join us at GreenCycle
                                and be a part of the solution. Green today,
                                green tomorrow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </LandingLayout>
    );
}
