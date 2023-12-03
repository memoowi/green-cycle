import EditIconButton from "@/Components/EditIconButton";
import FeaturedTable from "@/Components/FeaturedTable";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TrashIconButton from "@/Components/TrashIconButton";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ItemsTable() {
    const items = usePage().props.auth.items;
    // console.log(items);
    // sort based on date created
    const sortedItems = items.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    // Search State
    const [searchTerm, setSearchTerm] = useState("");
    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // Filter and paginate the items array based on the search term
    const filteredItems = sortedItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            item_image: "",
            price: "",
        });

    useEffect(() => {
        setData({
            ...selectedItem,
        });
        Object.keys(errors).forEach((key) => {
            errors[key] = null;
        });
    }, [selectedItem]);

    const openEdit = (item) => {
        setSelectedItem(item);
        setShowEdit(true);
    };

    const openDelete = (item) => {
        setSelectedItem(item);
        setShowDelete(true);
    };

    const closeEdit = () => {
        setSelectedItem(null);
        setShowEdit(false);
    };

    const closeDelete = () => {
        setSelectedItem(null);
        setShowDelete(false);
    };

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        post(route("admin.items.update", selectedItem.id), {
            onSuccess: () => closeEdit(),
        });
    };

    const submitDelete = (e) => {
        e.preventDefault();
        // post(route("admin.item.delete", selectedItem.id));
    };

    return (
        <div>
            <FeaturedTable
                placeholderSearch="Search items by name"
                valueInputSearch={searchTerm || ""}
                onChangeSearch={(e) => setSearchTerm(e.target.value)}
                previousClick={() => setCurrentPage(currentPage - 1)}
                disabledPrevious={currentPage === 1}
                nextClick={() => setCurrentPage(currentPage + 1)}
                disabledNext={paginatedItems.length <= pageSize}
                paginationInfo={
                    "Page " +
                    currentPage +
                    " of " +
                    Math.ceil(filteredItems.length / pageSize)
                }
            >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price ( /kg)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedItems.map((item) => (
                        <tr
                            key={item.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="px-6 py-4 text-gray-900 dark:text-white">
                                {item.id}
                            </td>
                            <td className="px-6 py-4 text-gray-900 dark:text-white">
                                <div className="text-base font-medium">
                                    {item.name}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <img
                                    className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200 dark:border-slate-600"
                                    src={
                                        "/storage/item-images/" +
                                        item.item_image
                                    }
                                    alt={item.name}
                                />
                            </td>
                            <td className="px-6 py-4 text-gray-900 dark:text-white">
                                {item.price}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <EditIconButton
                                        onClick={() => openEdit(item)}
                                        className="text-white bg-emerald-600 hover:bg-emerald-700"
                                        title="Edit Item"
                                    />
                                    <TrashIconButton
                                        // onClick={() => openModalBan(user)}
                                        className="text-white bg-red-600 hover:bg-red-700 rounded-lg p-3"
                                        title="Delete Item"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {paginatedItems.length === 0 && (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td colSpan={5} className="px-6 py-4 text-center">
                                No items found
                            </td>
                        </tr>
                    )}
                </tbody>
            </FeaturedTable>

            <Modal show={showEdit} onClose={closeEdit}>
                <div className="relative max-h-full">
                    {/* Modal content */}
                    <div className="flex items-start justify-between p-4 border-b bg-white dark:bg-gray-700 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit Item
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeEdit}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form
                        onSubmit={submit}
                        className="relative bg-white  shadow dark:bg-gray-700 w-full"
                    >
                        {/* Modal header */}
                        {/* Modal body */}
                        <div className="p-6 space-y-6 w-[92vw] sm:w-full max-h-[600px] overflow-y-auto">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 flex justify-center">
                                    <div className="relative overflow-hidden  rounded-lg  border-2 border-gray-200 dark:border-slate-600">
                                        {data.item_image &&
                                        typeof data.item_image === "object" ? (
                                            <img
                                                src={URL.createObjectURL(
                                                    data.item_image
                                                )}
                                                className="w-32 h-32 object-cover"
                                                alt="Preview"
                                            />
                                        ) : (
                                            <img
                                                src={data.item_image ? '/storage/item-images/' + data.item_image : '/storage/item-images/loading.svg'}
                                                className="w-32 h-32 object-cover"
                                                alt="Preview"
                                            />
                                        )}{" "}
                                        <InputLabel
                                            htmlFor="item_image"
                                            className="absolute w-full h-full top-0 flex items-center text-center bg-gray-500 bg-opacity-50 text-sm font-medium text-gray-900 dark:text-white"
                                            value="Click to change image"
                                        />
                                        <TextInput
                                            id="item_image"
                                            name="item_image"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) =>
                                                setData(
                                                    "item_image",
                                                    e.target.files[0]
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <InputError
                                    className="mt-2 col-span-12 text-center"
                                    message={errors.item_image}
                                />

                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Name"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="w-full"
                                        value={data.name || ""}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Price (/kg)"
                                    />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        className="w-full"
                                        value={data.price || ""}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.price}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                            <PrimaryButton
                                disabled={processing}
                                onClick={submit}
                            >
                                Save All
                            </PrimaryButton>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
