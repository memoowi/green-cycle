import { Link } from "@inertiajs/react";

export default function CardLandingLatest() {
    return (
        <div className="sm:w-[45%] md:w-[30%] mx-3 sm:mx-0 bg-white dark:bg-slate-700 overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="h-40">
                <img
                    src={"/images/card1.jpg"}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="px-6 space-y-5 text-gray-800 dark:text-gray-100">
                <h2 className="text-2xl font-medium mt-5">Waste Management</h2>
                <div className="w-24 h-1 bg-emerald-600"></div>
                <p className="text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <Link href={"/waste-management"} className="font-semibold">
                    <div className="w-fit px-3 py-2 my-5 border-2 border-emerald-600 hover:bg-emerald-100 dark:hover:text-emerald-600">
                        Read more
                    </div>
                </Link>
            </div>
        </div>
    );
}
