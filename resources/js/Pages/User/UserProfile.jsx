import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function UserProfile({ auth, user }) {
    // console.log(user);
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    };
    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center py-16 bg-emerald-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                            <div>
                                <div className="font-bold text-3xl">
                                    {user.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                <div>{formatCurrency(user.total_earned)} Earned</div>
                                <div className="w-3/12 h-1 bg-emerald-600 my-4"></div>
                            </div>
                            <div className="grid grid-cols-12 py-10">
                                <div className="col-span-12 sm:col-span-6 mx-auto">
                                    <img
                                        src={
                                            user.profile_photo
                                                ? "/storage/profile-photos/" +
                                                  user.profile_photo
                                                : "/storage/profile-photos/default.jpg"
                                        }
                                        alt={user.name}
                                        className="h-40 w-40 border-2 border-gray-300 bg-white bg-opacity-10 rounded-full object-cover shrink-0 shadow-lg"
                                    />
                                </div>

                                <div className="col-span-12 sm:col-span-6 mt-5 sm:mt-0 space-y-4">
                                    {user.date_of_birth ? (
                                        <div className="space-y-1">
                                            <h4 className="font-bold">
                                                Date of Birth :
                                            </h4>
                                            <p>
                                                {formatDate(user.date_of_birth)}
                                            </p>
                                        </div>
                                    ) : null}
                                    <div className="space-y-1">
                                        <h4 className="font-bold">Bio :</h4>
                                        <div className="p-3 border-2">
                                            {user.bio
                                                ? user.bio
                                                : "the user has no bio"}
                                        </div>
                                    </div>
                                    {user.website_link ? (
                                        <div className="space-y-1">
                                            <h4 className="font-bold">
                                                Website Link :
                                            </h4>
                                            <p>
                                                <a
                                                    className="hover:text-emerald-600 hover:underline"
                                                    href={user.website_link}
                                                    target="_blank"
                                                >
                                                    {user.website_link}
                                                </a>
                                            </p>
                                        </div>
                                    ) : null}
                                    <div className="space-y-1">
                                        <h4 className="font-bold">
                                            Social Media Link :
                                        </h4>
                                        <ul>
                                            <li className="hover:text-emerald-600 hover:underline">
                                                <a
                                                    href={user.social_link1}
                                                    target="_blank"
                                                >
                                                    {user.social_link1}
                                                </a>
                                            </li>
                                            <li className="hover:text-emerald-600 hover:underline">
                                                <a
                                                    href={user.social_link2}
                                                    target="_blank"
                                                >
                                                    {user.social_link2}
                                                </a>
                                            </li>
                                            <li className="hover:text-emerald-600 hover:underline">
                                                <a
                                                    href={user.social_link3}
                                                    target="_blank"
                                                >
                                                    {user.social_link3}
                                                </a>
                                            </li>
                                            <li className="hover:text-emerald-600 hover:underline">
                                                <a
                                                    href={user.social_link4}
                                                    target="_blank"
                                                >
                                                    {user.social_link4}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold">
                                            Date Joined :
                                        </h4>
                                        <p>{formatDate(user.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={user.name} />
            <Footer />
        </LandingLayout>
    );
}
