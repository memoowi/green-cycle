import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import NextButton from "@/Components/NextButton";
import TrashIconButton from "@/Components/TrashIconButton";
import { useEffect, useState } from "react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import FormModal from "@/Components/FormModal";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function ChooseItemPickUp({ auth }) {
    const items = usePage().props.auth.items;
    const pickUpId = usePage().props.pickUpId;
    const pickUpItems = usePage().props.pickUpItems;
    // console.log(items);
    const [totalWeight, setTotalWeight] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);

    // useEffect to update totals when pickUpItems change
    useEffect(() => {
        // Calculate total weight and total earnings
        const weightSum = pickUpItems.reduce(
            (sum, item) => sum + item.weight,
            0
        );
        const earningsSum = pickUpItems.reduce(
            (sum, item) => sum + item.approx_earn,
            0
        );

        // Update state variables
        setTotalWeight(weightSum);
        setTotalEarnings(earningsSum);
    }, [pickUpItems]);

    const {
        data,
        setData,
        get,
        post,
        delete: destroy,
        errors,
        processing,
        recentlySuccessful,
    } = useForm();
    const [showModal, setShowModal] = useState(false);

    const [showDelete, setShowDelete] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const calculateApproxEarn = (selectedItemId, weight) => {
        const selectedItem = items.find(
            (item) => item.id === parseInt(selectedItemId, 10)
        );
    
        if (selectedItem) {
            const approxEarn = selectedItem.price * weight;
            setData((data) => ({ ...data, approx_earn: approxEarn }));
        }
    };
    

    const handleWeightChange = (e) => {
        const newWeight = e.target.value;
        setData("weight", newWeight);

        // Calculate approx_earn while typing
        calculateApproxEarn(data.item_id, newWeight);
    };

    const submit = (e) => {
        e.preventDefault();

        // Calculate approx_earn before submitting the form
        calculateApproxEarn(data.item_id, data.weight);
        // console.log(data);
        // console.log(pickUpId);
        post(route("user.pick-up.add-items.add-item", { pickUpId: pickUpId }), {
            onSuccess: () => closeModal(),
        });
    };
    const openModal = (user) => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setData({});
        Object.keys(errors).forEach((key) => {
            errors[key] = null;
        });
    };

    const openDelete = (item) => {
        setSelectedItem(item);
        setShowDelete(true);
        // console.log(item.id);
    };

    const closeDelete = () => {
        setSelectedItem(null);
        setShowDelete(false);
    };

    const submitDelete = (e) => {
        e.preventDefault();
        // console.log(selectedItem.id);
        destroy(
            route("user.pick-up.add-items.remove-item", {
                itemId: selectedItem.id,
            }),
            {
                onSuccess: () => closeDelete(),
            }
        );
    };

    const nextSubmit = (e) => {
        e.preventDefault();
        
        get(route("user.pick-up.after-items", { pickUpId: pickUpId }));
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
                                        Add Items to Recycle
                                    </h2>
                                    <div className="w-3/12 h-1 bg-emerald-600 my-4"></div>
                                </div>
                                <div>
                                    <form onSubmit={nextSubmit} className="col-span-1 flex justify-end">
                                        <NextButton>Next</NextButton>
                                    </form>
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
                        <div className="p-4 flex justify-end">
                            <button
                                onClick={openModal}
                                className="group bg-emerald-600 text-white hover:bg-emerald-700 font-bold p-3 rounded"
                            >
                                <svg
                                    className="w-6 h-6 group-hover:animate-spin"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Item name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Weight
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Approx. Earn
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pickUpItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="bg-white dark:bg-gray-800"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {
                                                    items.find(
                                                        (i) =>
                                                            i.id ===
                                                            item.item_id
                                                    ).name
                                                }
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.weight} Kg
                                            </td>
                                            <td className="px-6 py-4">
                                                Rp. {item.approx_earn}
                                            </td>
                                            <td className="px-6 py-4">
                                                <TrashIconButton
                                                    onClick={() =>
                                                        openDelete(item)
                                                    }
                                                    className="text-white bg-red-500 hover:bg-red-800"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    {pickUpItems.length === 0 && (
                                        <tr className="bg-white dark:bg-gray-800">
                                            <td
                                                colSpan={4}
                                                className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                No Items
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr className="font-semibold text-gray-900 dark:text-white">
                                        <th
                                            scope="row"
                                            className="px-6 py-3 text-base"
                                        >
                                            Total
                                        </th>
                                        <td className="px-6 py-3">
                                            {totalWeight} Kg
                                        </td>
                                        <td className="px-6 py-3">
                                            Rp. {totalEarnings}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

            <FormModal
                title="Add Item"
                show={showModal}
                onClose={closeModal}
                onSubmit={submit}
                processing={processing}
                recentlySuccessful={recentlySuccessful}
            >
                <div className="col-span-12 sm:col-span-6">
                    <InputLabel
                        htmlFor="item_id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        value="Item"
                    />
                    <select
                        id="item_id"
                        className="w-full"
                        value={data.item_id || ""}
                        onChange={(e) => setData("item_id", e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            ----SELECT ITEM----
                        </option>
                        {items.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <InputError className="mt-2" message={errors.item_id} />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <InputLabel
                        htmlFor="weight"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        value="Weight"
                    />
                    <TextInput
                        id="weight"
                        type="number"
                        className="w-full"
                        value={data.weight || ""}
                        onChange={(e) => {
                            setData("weight", e.target.value);
                            handleWeightChange(e);
                        }}
                        required
                    />
                    <InputError className="mt-2" message={errors.weight} />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <InputLabel
                        htmlFor="approx_earn"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        value="Approx. Earn"
                    />
                    <TextInput
                        id="approx_earn"
                        type="number"
                        className="w-full"
                        value={data.approx_earn || ""}
                        onChange={(e) => setData("approx_earn", e.target.value)}
                        required
                        disabled
                    />
                    <InputError className="mt-2" message={errors.approx_earn} />
                </div>
            </FormModal>

            <ConfirmationModal
                show={showDelete}
                onClose={closeDelete}
                onSubmit={submitDelete}
                title="Delete Item"
                content="Are you sure you want to delete this item?"
            />
        </LandingLayout>
    );
}
