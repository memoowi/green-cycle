import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import UpdateLocationInformation from "../Location/Partials/UpdateLocationInformationForm";
import NextButton from "@/Components/NextButton";

export default function PickUp({ auth }) {
    const user = usePage().props.auth.user;
    const location = usePage().props.auth.location;
    // console.log(user);
    // console.log(location);
    const { post } = useForm({});
    const submit = (e) => {
        e.preventDefault();

        post(route("user.pick-up.create"));
    };
    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center py-16 bg-emerald-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                            <div className="grid grid-cols-3">
                                <div className="col-span-2">
                                    <h2 className="text-2xl font-bold uppercase tracking-wide">
                                        Set Pick Up Location
                                    </h2>
                                    <div className="w-3/12 h-1 bg-emerald-600 my-4"></div>
                                </div>
                                <div>
                                    <form className="col-span-1 flex justify-end" onSubmit={submit}>
                                        <NextButton>Next</NextButton>
                                    </form>
                                </div>
                            </div>
                            <UpdateLocationInformation />
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Pick Up" />
            <Footer />
        </LandingLayout>
    );
}
