import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function BusinessPublicProfile({ auth, business }) {
    // console.log(user);
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };
    const [provinceNames, setProvinceNames] = useState({});
    const [regencyNames, setRegencyNames] = useState({});
    const [districtNames, setDistrictNames] = useState({});
    const apiKey = import.meta.env.VITE_BINDERBYTE_API_KEY;

    useEffect(() => {
        const fetchProvinceNames = async () => {
            const provinceNamesMap = {};

            try {
                const response = await fetch(
                    `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`
                );
                const responseData = await response.json();

                for (const province of responseData.value) {
                    provinceNamesMap[province.id] = province.name;
                }
            } catch (error) {
                console.error(`Error fetching provinces: ${error.message}`);
            }

            setProvinceNames(provinceNamesMap);
        };

        fetchProvinceNames();
    }, [apiKey]);

    useEffect(() => {
        const fetchRegencyNames = async () => {
            const regencyNamesMap = {};

            try {
                const response = await fetch(
                    `https://api.binderbyte.com/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${business.province}`
                );
                const responseData = await response.json();

                for (const regency of responseData.value) {
                    regencyNamesMap[regency.id] = regency.name;
                }
            } catch (error) {
                console.error(`Error fetching regencies: ${error.message}`);
            }

            setRegencyNames(regencyNamesMap);
        };

        fetchRegencyNames();
    }, [business.province, apiKey]);

    useEffect(() => {
        const fetchDistrictNames = async () => {
            const districtNamesMap = {};

            try {
                const response = await fetch(
                    `https://api.binderbyte.com/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${business.regency}`
                );
                const responseData = await response.json();

                for (const district of responseData.value) {
                    districtNamesMap[district.id] = district.name;
                }
            } catch (error) {
                console.error(`Error fetching districts: ${error.message}`);
            }

            setDistrictNames(districtNamesMap);
        };

        fetchDistrictNames();
    }, [business.regency, apiKey]);




    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center py-16 bg-emerald-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                        <div className='bg-gray-300 p-6 h-36 sm:h-48 flex flex-col justify-end'
                            style={{
                                backgroundImage: `url(${
                                    business.business_banner
                                        ? "/storage/b-photos/" +
                                          business.business_banner
                                        : ""
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                                <div className="font-bold text-3xl bg-slate-100 dark:bg-slate-800 bg-opacity-40 dark:bg-opacity-60 backdrop-sepia backdrop-blur-2xl w-fit px-3">
                                    {business.business_name}
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 bg-opacity-40 dark:bg-opacity-60 backdrop-sepia backdrop-blur-2xl w-fit px-3">{business.business_email}</div>
                            </div>
                            <div className="grid grid-cols-12 py-10">
                                <div className="col-span-12 sm:col-span-6 mx-auto">
                                    <img
                                        src={
                                            business.business_photo
                                                ? "/storage/b-photos/" +
                                                  business.business_photo
                                                : "/storage/b-photos/business-default.png"
                                        }
                                        alt={business.business_name}
                                        className="h-40 w-40 border-2 border-gray-300 bg-white bg-opacity-10 rounded-lg object-cover shrink-0 shadow-lg"
                                    />
                                </div>

                                <div className="col-span-12 sm:col-span-6 mt-5 sm:mt-0 space-y-4">
                                    <div className="space-y-1">
                                        <h4 className="font-bold">Description :</h4>
                                        <div className="p-3 border-2">
                                            {business.description
                                                ? business.description
                                                : "the business has no description"}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold">Address :</h4>
                                        <div className="uppercase">
                                        {business.address + ", " +
                                        (districtNames[business.district] || "..Loading") +
                                        ", " + (regencyNames[business.regency] || "..Loading") +
                                        ", " + (provinceNames[business.province] || "..Loading") +
                                        ", " + business.postal_code}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold">Contact Number :</h4>
                                        <div>
                                            {business.business_number}
                                        </div>
                                    </div>
                                    {business.website_link ? (
                                        <div className="space-y-1">
                                            <h4 className="font-bold">
                                                Website Link :
                                            </h4>
                                            <p>
                                                <a
                                                    className="hover:text-emerald-600 hover:underline"
                                                    href={business.website_link}
                                                    target="_blank"
                                                >
                                                    {business.website_link}
                                                </a>
                                            </p>
                                        </div>
                                    ) : null}
                                    <div className="space-y-1">
                                        <h4 className="font-bold">
                                            Social Media Link :
                                        </h4>
                                        <ul>
                                            <li className="hover:text-emerald-600 hover:underline">
                                                <a
                                                    href={business.social_link1}
                                                    target="_blank"
                                                >
                                                    {business.social_link1}
                                                </a>
                                            </li>
                                            <li className="hover:text-emerald-600 hover:underline">
                                                <a
                                                    href={business.social_link2}
                                                    target="_blank"
                                                >
                                                    {business.social_link2}
                                                </a>
                                            </li>
                                            <li className="hover:text-emerald-600 hover:underline">
                                                <a
                                                    href={business.social_link3}
                                                    target="_blank"
                                                >
                                                    {business.social_link3}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold">
                                            Date Joined :
                                        </h4>
                                        <p>{formatDate(business.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={business.business_name} />
            <Footer />
        </LandingLayout>
    );
}
