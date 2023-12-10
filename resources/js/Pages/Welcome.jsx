import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link } from "@inertiajs/react";
import CardServices from "@/Components/CardServices";
import CardLandingItems from "@/Components/CardLandingItems";

export default function DashboardAdmin({ auth, landingItems }) {
    // console.log(landingItems);
    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="flex justify-center items-center h-[90vh] sm:h-screen bg-emerald-600">
                    <div className="md:flex md:justify-between max-w-7xl w-full px-8 pt-20">
                        <div className="self-center space-y-6 text-white">
                            <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight">
                                GreenCycle for
                                <br />
                                Everyone
                            </h1>
                            <div className="relative h-16 overflow-hidden">
                                <h2 className="text-2xl absolute animate-slideup">
                                    <p className="mb-24 h-8">
                                        Turning Waste into a Greener Tomorrow!
                                    </p>
                                    <p className="mb-24 h-8">
                                        Redefining Waste, Renewing Tomorrow!
                                    </p>
                                    <p>
                                        Where Waste Finds a Second Life!
                                    </p>
                                </h2>
                            </div>
                        </div>
                        <img
                            src={"/images/home1.svg"}
                            className="md:w-1/2 mt-10 md:mt-4"
                        />
                    </div>
                </div>
            }
        >
            <Head title="GreenCycle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl text-center my-8 font-semibold text-gray-800 dark:text-white">
                        The latest from GreenCycle
                    </h2>
                    <div className=" w-1/12 h-1 bg-emerald-600 mx-auto mb-8"></div>
                    <div className="flex flex-wrap justify-around gap-4">
                        <div className="sm:w-[45%] md:w-[30%] mx-3 sm:mx-0 bg-white dark:bg-slate-700 overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div className="h-40">
                                <img
                                    src={"/images/card1.jpg"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="px-6 space-y-5 text-gray-800 dark:text-gray-100">
                                <h2 className="text-2xl font-medium mt-5">
                                    Waste Management
                                </h2>
                                <div className="w-24 h-1 bg-emerald-600"></div>
                                <p className="text-lg">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                                <Link
                                    href={"/waste-management"}
                                    className="font-semibold"
                                >
                                    <div className="w-fit px-3 py-2 my-5 border-2 border-emerald-600 hover:bg-emerald-100 dark:hover:text-emerald-600">
                                        Read more
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="sm:w-[45%] md:w-[30%] mx-3 sm:mx-0 bg-white dark:bg-slate-700 overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div className="h-40">
                                <img
                                    src={"/images/card1.jpg"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="px-6 space-y-5 text-gray-800 dark:text-gray-100">
                                <h2 className="text-2xl font-medium mt-5">
                                    Waste Management
                                </h2>
                                <div className="w-24 h-1 bg-emerald-600"></div>
                                <p className="text-lg">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                                <Link
                                    href={"/waste-management"}
                                    className="font-semibold"
                                >
                                    <div className="w-fit px-3 py-2 my-5 border-2 border-emerald-600 hover:bg-emerald-100 dark:hover:text-emerald-600">
                                        Read more
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="sm:w-[45%] md:w-[30%] mx-3 sm:mx-0 bg-white dark:bg-slate-700 overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div className="h-40">
                                <img
                                    src={"/images/card1.jpg"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="px-6 space-y-5 text-gray-800 dark:text-gray-100">
                                <h2 className="text-2xl font-medium mt-5">
                                    Waste Management
                                </h2>
                                <div className="w-24 h-1 bg-emerald-600"></div>
                                <p className="text-lg">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                                <Link
                                    href={"/waste-management"}
                                    className="font-semibold"
                                >
                                    <div className="w-fit px-3 py-2 my-5 border-2 border-emerald-600 hover:bg-emerald-100 dark:hover:text-emerald-600">
                                        Read more
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="services" className="pt-6 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl text-left my-4 font-semibold text-gray-800 dark:text-white">
                        Services
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-200 mb-4">
                        GreenCycle provides a wide range of services to help
                        businesses and individuals.
                    </p>
                    <div className="w-1/12 h-1 bg-emerald-600 mb-8"></div>
                    <div className="flex flex-wrap justify-evenly gap-3 sm:gap-4 md:gap-0">
                        <CardServices
                            icon={
                                <svg
                                    className="w-8 h-6 fill-emerald-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                >
                                    <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                                </svg>
                            }
                            lineColor="bg-emerald-600"
                            title={"Pick Up"}
                            description={
                                "Let GreenCycle help you pick up your waste and turn it into revenue."
                            }
                        />
                        <CardServices
                            icon={
                                <svg
                                    className="w-8 h-6 fill-sky-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                >
                                    <path d="M256 48c0-26.5 21.5-48 48-48H592c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H381.3c1.8-5 2.7-10.4 2.7-16V253.3c18.6-6.6 32-24.4 32-45.3V176c0-26.5-21.5-48-48-48H256V48zM571.3 347.3c6.2-6.2 6.2-16.4 0-22.6l-64-64c-6.2-6.2-16.4-6.2-22.6 0l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L480 310.6V432c0 8.8 7.2 16 16 16s16-7.2 16-16V310.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0zM0 176c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V176zm352 80V480c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V256H352zM144 320c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H144z" />
                                </svg>
                            }
                            lineColor="bg-sky-600"
                            title={"Drop Off"}
                            description={
                                "Deliver your waste to the nearest GreenCycle drop off location."
                            }
                        />
                        <CardServices
                            icon={
                                <svg
                                    className="w-8 h-6 fill-yellow-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                >
                                    <path d="M480 0c-17.7 0-32 14.3-32 32V192 512h64V192H624c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16H512c0-17.7-14.3-32-32-32zM416 159L276.8 39.7c-12-10.3-29.7-10.3-41.7 0l-224 192C1 240.4-2.7 254.5 2 267.1S18.6 288 32 288H64V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v96c0 17.7 14.3 32 32 32h64.7l.2 0h-1V159z" />
                                </svg>
                            }
                            lineColor="bg-yellow-600"
                            title={"Recycle Facility"}
                            description={
                                "Open a GreenCycle facility to get access to wide range of waste products adn turn them into valuable items."
                            }
                        />
                        <CardServices
                            icon={
                                <svg
                                    className="w-8 h-8 fill-teal-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M174.7 45.1C192.2 17 223 0 256 0s63.8 17 81.3 45.1l38.6 61.7 27-15.6c8.4-4.9 18.9-4.2 26.6 1.7s11.1 15.9 8.6 25.3l-23.4 87.4c-3.4 12.8-16.6 20.4-29.4 17l-87.4-23.4c-9.4-2.5-16.3-10.4-17.6-20s3.4-19.1 11.8-23.9l28.4-16.4L283 79c-5.8-9.3-16-15-27-15s-21.2 5.7-27 15l-17.5 28c-9.2 14.8-28.6 19.5-43.6 10.5c-15.3-9.2-20.2-29.2-10.7-44.4l17.5-28zM429.5 251.9c15-9 34.4-4.3 43.6 10.5l24.4 39.1c9.4 15.1 14.4 32.4 14.6 50.2c.3 53.1-42.7 96.4-95.8 96.4L320 448v32c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-64-64c-9.4-9.4-9.4-24.6 0-33.9l64-64c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2v32l96.2 0c17.6 0 31.9-14.4 31.8-32c0-5.9-1.7-11.7-4.8-16.7l-24.4-39.1c-9.5-15.2-4.7-35.2 10.7-44.4zm-364.6-31L36 204.2c-8.4-4.9-13.1-14.3-11.8-23.9s8.2-17.5 17.6-20l87.4-23.4c12.8-3.4 26 4.2 29.4 17L182 241.2c2.5 9.4-.9 19.3-8.6 25.3s-18.2 6.6-26.6 1.7l-26.5-15.3L68.8 335.3c-3.1 5-4.8 10.8-4.8 16.7c-.1 17.6 14.2 32 31.8 32l32.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32.2 0C42.7 448-.3 404.8 0 351.6c.1-17.8 5.1-35.1 14.6-50.2l50.3-80.5z" />
                                </svg>
                            }
                            lineColor="bg-teal-600"
                            title={"Do It Yourself"}
                            description={
                                "You can recycle your own waste with our easy-to-use platform."
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl text-left my-4 font-semibold text-gray-800 dark:text-white">
                        Type of Waste
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-200 mb-4">
                        We have many different types of waste. Here are some of
                        them:
                    </p>
                    <div className="w-1/12 h-1 bg-emerald-600 mb-8"></div>
                    <div className="flex flex-wrap justify-evenly gap-4">
                        {landingItems.map((item) => (
                            <CardLandingItems
                                key={item.id}
                                image={item.item_image}
                                title={item.name}
                            />
                        ))}
                        <CardLandingItems image={false} title={"and more..."} />
                    </div>
                </div>
            </div>

            <Footer />
        </LandingLayout>
    );
}
