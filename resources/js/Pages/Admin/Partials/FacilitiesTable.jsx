import BanIconButton from "@/Components/BanIconButton";
import ConfirmationModal from "@/Components/ConfirmationModal";
import EditIconButton from "@/Components/EditIconButton";
import FeaturedTable from "@/Components/FeaturedTable";
import XUserIconButton from "@/Components/XUserIconButton";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function FacilitiesTable() {
    const businesses = usePage().props.auth.businesses;
    // console.log(businesses);

    // sort based on date created
    const sortedBusinesses = businesses.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    // Search State
    const [searchTerm, setSearchTerm] = useState("");

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Filter and paginate the businesses array based on the search term
    const filteredBusinesses = sortedBusinesses.filter((business) =>
        business.business_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const paginatedBusinesses = filteredBusinesses.slice(startIndex, endIndex);

    const [showRemove, setShowRemove] = useState(false);
    const [showBan, setShowBan] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [regencyNames, setRegencyNames] = useState({});

    const { data, setData, patch, get } = useForm();

    const apiKey = import.meta.env.VITE_BINDERBYTE_API_KEY;

    useEffect(() => {
        const fetchRegencyNames = async () => {
            const regencyNamesMap = {};
            for (const business of businesses) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${business.province}`
                    );
                    const responseData = await response.json();
                    const regencyData = responseData.value.find(
                        (regency) => regency.id === business.regency
                    );
                    const regencyName = regencyData ? regencyData.name : "Unknown";
                    regencyNamesMap[business.id] = regencyName;
                } catch (error) {
                    console.error(
                        `Error fetching regency for business with ID ${business.id}: ${error.message}`
                    );
                }
            }
            setRegencyNames(regencyNamesMap);
        };

        fetchRegencyNames();
    }, [businesses, apiKey]);


    useEffect(() => {
        // console.log(selectedBusiness);
        if (selectedBusiness) {
            setData({ ...selectedBusiness });
        }
    }, [selectedBusiness]);

    const openEdit = (business) => {
        get(route("admin.facilities.edit", business.id));
    };

    const openRemove = (business) => {
        setSelectedBusiness(business);
        setShowRemove(true);
    };

    const openBan = (business) => {
        setSelectedBusiness(business);
        // console.log(data.is_ban);
        setShowBan(true);
    };

    const closeRemove = () => {
        setSelectedBusiness(null);
        setShowRemove(false);
    };

    const closeBan = () => {
        setSelectedBusiness(null);
        setShowBan(false);
    };

    const submitRemove = (e) => {
        e.preventDefault();

        patch(route("admin.facilities.removePhotos", selectedBusiness.id), {
            onSuccess: () => closeRemove(),
        });
    };

    const submitBan = (e) => {
        e.preventDefault();

        patch(route("admin.facilities.ban", selectedBusiness.id), {
            onSuccess: () => closeBan(),
        });
    };

    return (
        <div>
            <FeaturedTable
                placeholderSearch="Search facilities..."
                valueInputSearch={searchTerm || ""}
                onChangeSearch={(e) => setSearchTerm(e.target.value)}
                previousClick={() => setCurrentPage(currentPage - 1)}
                disabledPrevious={currentPage === 1}
                nextClick={() => setCurrentPage(currentPage + 1)}
                disabledNext={filteredBusinesses.length <= pageSize}
                paginationInfo={
                    "Page " +
                    currentPage +
                    " of " +
                    Math.ceil(filteredBusinesses.length / pageSize)
                }
            >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Regency
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Banned Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedBusinesses.map((business) => (
                        <tr
                            key={business.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <th
                                scope="row"
                                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                <img
                                    className={
                                        "w-12 h-12 rounded-lg object-cover border-2 border-gray-200 dark:border-slate-600 " +
                                        (business.business_photo
                                            ? ""
                                            : "bg-gray-200")
                                    }
                                    src={
                                        business.business_photo
                                            ? "/storage/b-photos/" +
                                              business.business_photo
                                            : "/storage/b-photos/business-default.png"
                                    }
                                    alt={business.business_name}
                                />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">
                                        {business.business_name}
                                    </div>
                                    <div className="font-normal text-gray-500">
                                        {business.business_email}
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                {regencyNames[business.id] || "Loading..."}
                            </td>
                            <td className="px-6 py-4">
                                <div
                                    className={
                                        "px-2.5 py-1 w-fit rounded-xl text-white font-semibold " +
                                        (business.status === 1
                                            ? "bg-emerald-600"
                                            : "bg-red-600")
                                    }
                                >
                                    {business.status === 1
                                        ? "Active"
                                        : "Inactive"}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={
                                            "w-2.5 h-2.5 rounded-full " +
                                            (business.is_ban
                                                ? "bg-red-600"
                                                : "bg-emerald-600")
                                        }
                                    ></div>
                                    {business.is_ban ? " Banned" : " Normal"}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1">
                                    <EditIconButton
                                        onClick={() => openEdit(business)}
                                        className="text-white bg-emerald-600 hover:bg-emerald-700"
                                        title="Edit"
                                    />
                                    <XUserIconButton
                                        onClick={() => openRemove(business)}
                                        className="text-white bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400"
                                        title="Reset Photo and Banner"
                                        disabled={
                                            business.business_photo === null
                                        }
                                    />
                                    <BanIconButton
                                        onClick={() => openBan(business)}
                                        className={
                                            (business.is_ban
                                                ? "-hue-rotate-180"
                                                : "") +
                                            " text-white bg-red-600 hover:bg-red-700"
                                        }
                                        title="Ban / Unban"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {paginatedBusinesses.length === 0 && (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td colSpan={5} className="px-6 py-4 text-center">
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </FeaturedTable>

            {/* Remove Photo and Banner Modal */}
            <ConfirmationModal
                show={showRemove}
                onClose={closeRemove}
                onSubmit={submitRemove}
                title={"Remove Photo and Banner of " + data.business_name}
                content={"Are you sure ?"}
            />
            {/* Ban Modal */}
            <ConfirmationModal
                show={showBan}
                onClose={closeBan}
                onSubmit={submitBan}
                title={
                    (data.is_ban ? "Unban" : "Ban") + " " + data.business_name
                }
                content="Are you sure ?"
            />
        </div>
    );
}
