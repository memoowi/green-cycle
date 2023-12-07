import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import NextButton from "@/Components/NextButton";
import TrashIconButton from "@/Components/TrashIconButton";
import { useEffect, useState } from "react";
import ConfirmationModal from "@/Components/ConfirmationModal";

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

    const { delete:destroy } = useForm();
    const [ showDelete , setShowDelete ] = useState(false);
    const [ selectedItem , setSelectedItem ] = useState(null);

    const openDelete = (item) => {
        setSelectedItem(item);
        setShowDelete(true);
        console.log(item.id);
    };

    const closeDelete = () => {
        setSelectedItem(null);
        setShowDelete(false);
    };

    const submitDelete = (e) => {
        e.preventDefault();
        console.log(selectedItem.id);
        destroy(route("user.pick-up.add-items.remove-item", {
            itemId: selectedItem.id
        }), {
            onSuccess: () => closeDelete(),
        });
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
                                    <form className="col-span-1 flex justify-end">
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
                                                onClick={() => openDelete(item)}
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
