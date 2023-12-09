import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function TakeOrderLists() {
    const takeOrders = usePage().props.auth.takeOrders;
    // console.log(takeOrders);
    const formatDateTime = (dateTimeString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        };
        return new Date(dateTimeString).toLocaleDateString("en-US", options);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    };

    const calculateTotalApproxEarn = (takeOrder) => {
        const pickupItems = takeOrder.pickupitem;
        // console.log(pickupItems);
        return pickupItems.reduce(
            (total, item) => total + (item.approx_earn || 0),
            0
        );
    };

    const [showDeatils, setShowDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { patch } = useForm();

    const submit = (e) => {
        e.preventDefault();

        // console.log(selectedOrder);
        patch(route("business.take-order.pick", { order : selectedOrder.id}), {
            onSuccess: () => {
                setSelectedOrder(null);
            },
        });
    };
    return (
        <div>
            <div className="space-y-5">
                {takeOrders.map((takeOrder) => (
                    <div
                        key={takeOrder.id}
                        className="border-2 border-gray-300"
                    >
                        <div className="grid grid-cols-12 p-4">
                            <div className="col-span-6 self-center">
                                <h3 className="uppercase text-lg font-bold">
                                    Order ID : P - {takeOrder.id}
                                </h3>
                                <p className="text-sm">
                                    Order By : {takeOrder.user.name}
                                </p>
                                <p className="text-sm">
                                    Order Date :{" "}
                                    {formatDateTime(takeOrder.created_at)}
                                </p>
                            </div>
                            <div className="col-span-6 self-center text-end">
                                <p className="text-sm italic">
                                    {takeOrder.status == 1 && "Pending"}
                                </p>
                                <p className="text-sm uppercase">
                                    {takeOrder.paymentmethod.type}
                                </p>
                                <p className="text-lg font-bold">
                                    {formatCurrency(
                                        calculateTotalApproxEarn(takeOrder)
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end border-t-2 border-gray-300 p-3 gap-3">
                            <button className="border-2 border-gray-700 dark:border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white font-bold py-2 px-4 rounded">
                                View Detail
                            </button>
                            <form onSubmit={submit} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
                                <button type="submit" onClick={() => setSelectedOrder(takeOrder)}>
                                    Take Order
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
