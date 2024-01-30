import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import CTA from "@/Components/CTA";
import { useEffect, useState } from "react";
import FeaturedTable from "@/Components/FeaturedTable";
import DetailsIconButton from "@/Components/DetailsIconButton";

export default function DropOff({ auth }) {
    const businesses = usePage().props.auth.businesses;

    const sortedBusinesses = businesses.sort((a, b) => {
        return a.business_name.localeCompare(b.business_name);
    });

    const [searchTerm, setSearchTerm] = useState("");

    const filteredBusinesses = sortedBusinesses.filter(
        (business) =>
            business.business_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            business.business_email
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            business.address
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            business.province
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            business.regency
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            business.district
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedBusinesses = filteredBusinesses.slice(
        startIndex,
        endIndex
    );

    const [option, setOption] = useState(null);
    const [provinceNames, setProvinceNames] = useState({});
    const [regencyNames, setRegencyNames] = useState({});
    const [districtNames, setDistrictNames] = useState({});
    const apiKey = import.meta.env.VITE_BINDERBYTE_API_KEY;

    useEffect(() => {
        const fetchProvinceNames = async () => {
            const provinceNamesMap = {};
            for (const business of businesses) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`
                    );
                    const responseData = await response.json();
                    const provinceData = responseData.value.find(
                        (province) => province.id === business.province
                    );
                    const provinceName = provinceData ? provinceData.name : "Unknown";
                    provinceNamesMap[business.id] = provinceName;
                } catch (error) {
                    console.error(
                        `Error fetching province for business with ID ${business.id}: ${error.message}`
                    );
                }
            }
            setProvinceNames(provinceNamesMap);
        };

        fetchProvinceNames();
    }, [businesses, apiKey]);
    
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
        const fetchDistrictNames = async () => {
            const districtNamesMap = {};
            for (const business of businesses) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${business.regency}`
                    );
                    const responseData = await response.json();
                    const districtData = responseData.value.find(
                        (district) => district.id === business.district
                    );
                    const districtName = districtData ? districtData.name : "Unknown";
                    districtNamesMap[business.id] = districtName;
                } catch (error) {
                    console.error(
                        `Error fetching district for business with ID ${business.id}: ${error.message}`
                    );
                }
            }
            setDistrictNames(districtNamesMap);
        };

        fetchDistrictNames();
    }, [businesses, apiKey]);

    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center min-h-[90vh] sm:min-h-screen bg-cyan-600">
                    <div className="max-w-7xl w-full px-8 pt-32 pb-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 text-gray-800 dark:text-gray-200">
                            <h1 className="text-2xl font-bold uppercase tracking-widest">
                                Drop Off
                            </h1>
                            <div className="w-3/12 h-1 bg-cyan-600 mt-4 mb-8"></div>

                            <p className="text-lg">
                                Select the facility you would like to drop off
                                your item. Search by...
                            </p>
                            {option == null && (
                                <div className="grid sm:grid-cols-2 mt-10 gap-5">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOption("facilityName")
                                        }
                                        className="bg-cyan-600 hover:bg-cyan-700"
                                    >
                                        Facility's Name
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setOption("location")}
                                        className="bg-cyan-600 hover:bg-cyan-700"
                                    >
                                        Location
                                    </button>
                                </div>
                            )}
                            <div>
                                {option == "facilityName" && (
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
                                                Facility
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Contact
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Available Items
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
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="grid">
                                                    <a href={route("business.public.profile", business.id)} target="_blank" className="text-base font-semibold hover:text-gray-700 hover:underline dark:hover:text-gray-400">
                                                        {business.business_name}
                                                    </a>
                                                    <a href="mailto:{business.business_email}" className="font-normal text-gray-500 hover:text-gray-700 hover:underline dark:hover:text-gray-400">
                                                        {business.business_email}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                                <div>
                                                    {business.address + ", " + districtNames[business.id] + ", " + regencyNames[business.id] + ", " + provinceNames[business.id] + ", " + business.postal_code}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                                <div>
                                                    {business.business_number}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-1">
                                                    <DetailsIconButton
                                                        // onClick={() => openDetails(business)}
                                                        className="text-white bg-teal-600 hover:bg-teal-700"
                                                        // title="Edit"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-1">
                                                    <DetailsIconButton
                                                        // onClick={() => openDetails(business)}
                                                        className="text-white bg-teal-600 hover:bg-teal-700"
                                                        // title="Edit"
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
                                )}
                                {option == "location" && <p>Location</p>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Drop Off" />
            <Footer />
        </LandingLayout>
    );
}
