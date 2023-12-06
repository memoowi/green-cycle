import CardCheckbox from "@/Components/CardCheckbox";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function BusinessItemsForm() {
    const { items, business, businessItems } = usePage().props.auth;
    const { data, setData, post } = useForm({
        business_id: business.id,
    });
    
    useEffect(() => {
        // Ensure businessItems is available
        if (businessItems) {
            // Fetch and set the items already registered for the business
            const registeredItems = businessItems.map((item) => item.item_id);
            setData('registeredItems', registeredItems);
        }
    }, [ businessItems]);

    const handleItemSelection = (itemId) => {
        setData('item_id', itemId);
    };

    const submit = (e) => {
        e.preventDefault();
        // Ensure data is available
        if (data && data.item_id !== null) {
            // console.log(data);
            post(route("business.items.store"), {
                business_id: data.business_id,
                item_id: data.item_id,
            } );
            setData('item_id', null);
        }
    };

    return (
        <div>
            <p className="text-2xl font-bold uppercase mb-4 dark:text-gray-100">
                List New Item
            </p>
            <form onSubmit={submit}>
                <ul className="grid w-full max-h-96 md:max-h-40 overflow-y-auto gap-6 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                    {items.map((item) => (
                        <CardCheckbox
                            id={item.id}
                            type="radio"
                            name="item_id"
                            key={item.id}
                            icon={
                                <img
                                    src={"/storage/item-images/" + item.item_image}
                                    className="w-14 h-14 object-cover mb-2 rounded-lg"
                                />
                            }
                            title={item.name}
                            onChange={() => handleItemSelection(item.id)}
                            checked={data && data.item_id === item.id}
                            disabled={data && data.registeredItems && data.registeredItems.includes(item.id)}
                        >
                            {item.price} /kg
                        </CardCheckbox>
                    ))}
                </ul>

                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-50"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
