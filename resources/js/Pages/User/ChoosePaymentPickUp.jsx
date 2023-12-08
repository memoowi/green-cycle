import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import NextButton from "@/Components/NextButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function ChoosePaymentPickUp({ auth }) {
    const pickUpId = usePage().props.pickUpId;
    // console.log(pickUpId);

    const { data, setData, post, processing, errors, reset } = useForm({
        type: "",
        account_name: "",
        account_number: "",
    });
    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        // console.log(pickUpId);
        post(route("user.pick-up.set-payment", { pickUpId: pickUpId }));
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
                                        Choose Payment Method
                                    </h2>
                                    <div className="w-3/12 h-1 bg-emerald-600 my-4"></div>
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <div className="">
                                        <NextButton onClick={submit}>
                                            Next
                                        </NextButton>
                                    </div>
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
                        <form className="grid md:grid-cols-2 gap-4 p-8">
                            <div className="col-span-1 space-y-3">
                                <InputLabel
                                    htmlFor="type"
                                    value="Payment Method"
                                />
                                <select
                                    id="type"
                                    name="type"
                                    className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                    value={data.type || ""}
                                    onChange={(e) =>
                                        setData((data.type = e.target.value))
                                    }
                                >
                                    <option value="" disabled>
                                        ---CHOOSE PAYMENT METHOD---
                                    </option>
                                    <option value="cash">Cash</option>
                                    <option value="transfer">
                                        Bank Transfer
                                    </option>
                                    <option value="e-wallet">E-Wallet</option>
                                </select>
                                <InputError
                                    message={errors.type}
                                    className="mt-2"
                                />
                            </div>
                            {["transfer", "e-wallet"].includes(data.type) && (
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <InputLabel
                                            htmlFor="account_name"
                                            value="Account Name"
                                        />
                                        <TextInput
                                            id="account_name"
                                            name="account_name"
                                            type="text"
                                            className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                            value={data.account_name || ""}
                                            onChange={(e) =>
                                                setData(
                                                    (data.account_name =
                                                        e.target.value)
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.account_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <InputLabel
                                            htmlFor="account_number"
                                            value="Account Number"
                                        />
                                        <TextInput
                                            id="account_number"
                                            name="account_number"
                                            type="text"
                                            className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                            value={data.account_number || ""}
                                            onChange={(e) =>
                                                setData(
                                                    (data.account_number =
                                                        e.target.value)
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.account_number}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </LandingLayout>
    );
}
