import ConfirmationModal from "@/Components/ConfirmationModal";
import FeaturedTable from "@/Components/FeaturedTable";
import TrashIconButton from "@/Components/TrashIconButton";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function BusinessItemsLists() {
    const { items, businessItems } = usePage().props.auth;
    // console.log(items);

    // sort based on date created
    const sortedItems = businessItems.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    // Search State
    const [searchTerm, setSearchTerm] = useState("");

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Filter and paginate the items array based on the search term
    const filteredItems = sortedItems.filter((item) =>
        (items.find((i) =>i.id ===item.item_id).name).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    const { delete:destroy } = useForm();
    const [ showDelete , setShowDelete ] = useState(false);
    const [ selectedItem , setSelectedItem ] = useState(null);

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
        // console.log(selectedItem);
        destroy(route("business.items.delete", selectedItem.id), {
            onSuccess: () => closeDelete(),
        });
    };

    return (
        <div>
            <FeaturedTable
                placeholderSearch="Search Registered Items..."
                valueInputSearch={searchTerm || ""}
                onChangeSearch={ (e) => setSearchTerm(e.target.value) }
                previousClick={ () => setCurrentPage(currentPage - 1) }
                disabledPrevious={ currentPage === 1 }
                nextClick={ () => setCurrentPage(currentPage + 1) }
                disabledNext={ filteredItems.length <= pageSize }
                paginationInfo={ "Page " + currentPage + " of " + Math.ceil(filteredItems.length / pageSize) }
                totalItems={ filteredItems.length }
            >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
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
                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={ "/storage/item-images/" + items.find((i) => i.id ===item.item_id).item_image}
                                        alt={(items.find((i) =>i.id ===item.item_id).name)}
                                    />
                                </div>
                                <div className="ml-4">
                                    <div className="text-base font-medium">
                                        {(items.find((i) =>i.id ===item.item_id).name)}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                                {(items.find((i) => i.id === item.item_id).price)}
                        </td>
                        <td className="px-6 py-4">
                            <TrashIconButton
                                onClick={() => openDelete(item)}
                                className="text-white bg-red-600 hover:bg-red-700 rounded-lg p-3"
                                title="Delete Item "
                            />
                        </td>
                    </tr>
                ))}
                {paginatedItems.length === 0 && (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td colSpan="3" className="px-6 py-4 text-center">
                            No items found
                        </td>
                    </tr>
                )}
                </tbody>
            </FeaturedTable>

            <ConfirmationModal
                show={showDelete}
                onClose={closeDelete}
                onSubmit={submitDelete}
                title="Delete Item"
                content="Are you sure you want to delete this item?"
            />
        </div>
    );
}
