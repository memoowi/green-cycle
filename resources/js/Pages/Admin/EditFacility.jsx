import ArrowBreadcrumbs from "@/Components/ArrowBreadcrumbs";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditFacility({ auth, business }) {

    const { data, setData, patch, processing, errors, reset } = useForm({
        business_banner: business.business_banner,
        business_photo: business.business_photo,
        business_name: business.business_name,
        description: business.description,
        address: business.address,
        province: business.province,
        regency: business.regency,
        district: business.district,
        postal_code: business.postal_code,
        business_number: business.business_number,
        business_email: business.business_email,
        website_link: business.website_link,
        social_link1: business.social_link1,
        social_link2: business.social_link2,
        social_link3: business.social_link3,
    });
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [regencyOptions, setRegencyOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const apiKey = import.meta.env.VITE_BINDERBYTE_API_KEY;

    useEffect(() => {
        const fetchProvinceOptions = async () => {
            try {
                const apiUrl = `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`;

                const response = await fetch(apiUrl);
                const data = await response.json();
                setProvinceOptions(Object.values(data[ 'value' ]));
            } catch (error) {
                console.error('Error fetching province options:', error);
            }
        };

        fetchProvinceOptions();
    }, []);

    useEffect(() => {
        const fetchRegencyOptions = async () => {
            try {
                const prov = { province: data.province };
                const apiUrl = `https://api.binderbyte.com/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${prov.province}`;
    
                const response = await fetch(apiUrl);
                const regencyData = await response.json();
                setRegencyOptions(Object.values(regencyData['value']));
            } catch (error) {
                console.error('Error fetching regency options:', error);
            }
        };
    
        if (data.province) {
            fetchRegencyOptions();
        } else {
            // Reset regency options if no province is selected
            setRegencyOptions([]);
        }
    }, [data.province]);

    useEffect(() => {
        const fetchDistrictOptions = async () => {
            try {
                const regen = { regency: data.regency };
                const apiUrl = `https://api.binderbyte.com/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${regen.regency}`;
    
                const response = await fetch(apiUrl);
                const districtData = await response.json();
                setDistrictOptions(Object.values(districtData['value']));
            } catch (error) {
                console.error('Error fetching district options:', error);
            }
        };
    
        if (data.regency) {
            fetchDistrictOptions();
        } else {
            // Reset district options if no regency is selected
            setDistrictOptions([]);
        }
    }, [data.regency]);

    const submit = (e) => {
        e.preventDefault();
        patch(route("admin.facilities.update", business.id),{
            onSuccess: () => {
                toast.success("Facility updated successfully");
            },
        });
    };

    return (
        <AdminPanelLayout
            user={auth.user}
            header={
                <h2 className="inline-flex items-center font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight select-none">
                    <Link href={route("admin.recycle-facilities")} className="hover:underline">
                        Recycle Facilities
                    </Link>
                    <ArrowBreadcrumbs />
                    <Link href={route("admin.facilities.edit", business.id)} className="hover:underline">
                        Edit {business.business_name}
                    </Link>
                </h2>
            }
        >
            <Head title="Recycle Facilities" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="h-60 relative hover:cursor-not-allowed">
                            <div className="h-3/4 bg-slate-400 bg-cover" style={ business.business_banner && { backgroundImage: `url('/storage/b-photos/${business.business_banner}')` } }></div>
                            <div className="bg-slate-200 w-32 md:w-40 h-32 md:h-40 absolute rounded-lg z-20 bottom-0 left-10 border-4 border-gray-200 overflow-hidden">
                                <img src={business.business_photo ? `/storage/b-photos/${business.business_photo}` : '/storage/b-photos/business-default.png'} className="w-full h-full object-cover"/>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="text-sm font-medium select-none text-red-700">
                                Business Photo and Banner aren't editable.<br/> Go back to the 
                                <Link href={route("admin.recycle-facilities")} className="hover:underline font-bold"> previous page </Link> 
                                to force delete them.
                            </div>
                            <form onSubmit={submit}>
                                <div className="space-y-3">
                                    <div className="text-end py-2">
                                        <PrimaryButton
                                            disabled={processing}
                                        >
                                            Save
                                        </PrimaryButton>
                                    </div>
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="business_name"
                                            value="Business Name"
                                            className="col-span-3"
                                        />
                                        <TextInput
                                            id="business_name"
                                            type="text"
                                            value={data.business_name}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("business_name", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.business_name} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                            className="col-span-3"
                                        />
                                        <textarea
                                            id="description"
                                            type="text"
                                            value={data.description || ''}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("description", e.target.value)}
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.description} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="address"
                                            value="Address"
                                            className="col-span-3"
                                        />
                                        <TextInput
                                            id="address"
                                            type="text"
                                            value={data.address}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("address", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.address} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="province"
                                            value="Province"
                                            className="col-span-3"
                                        />
                                        <select
                                            id="province"
                                            value={data.province || ''}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("province", e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>-- SELECT PROVINCE --</option>
                                            {provinceOptions.map((province) => (
                                            <option key={province.id} value={province.id}>{province.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError className="mt-2" message={errors.province} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="regency"
                                            value="Regency"
                                            className="col-span-3"
                                        />
                                        <select
                                            id="regency"
                                            value={data.regency || ''}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("regency", e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>-- SELECT REGENCY --</option>
                                            {regencyOptions.map((regency) => (
                                            <option key={regency.id} value={regency.id}>{regency.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError className="mt-2" message={errors.regency} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="district"
                                            value="District"
                                            className="col-span-3"
                                        />
                                        <select
                                            id="district"
                                            value={data.district || ''}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("district", e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>-- SELECT DISTRICT --</option>
                                            {districtOptions.map((district) => (
                                            <option key={district.id} value={district.id}>{district.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError className="mt-2" message={errors.district} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="postal_code"
                                            value="Postal Code"
                                            className="col-span-3"
                                        />
                                        <TextInput
                                            id="postal_code"
                                            type="text"
                                            value={data.postal_code}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("postal_code", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.postal_code} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="business_number"
                                            value="Business Number"
                                            className="col-span-3"
                                        />
                                        <TextInput
                                            id="business_number"
                                            type="tel"
                                            value={data.business_number}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("business_number", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.business_number} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="business_email"
                                            value="Business Email"
                                            className="col-span-3"
                                        />
                                        <TextInput
                                            id="business_email"
                                            type="email"
                                            value={data.business_email}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("business_email", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.business_email} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="website_link"
                                            value="Website Link"
                                            className="col-span-3"
                                        />
                                        <TextInput
                                            id="website_link"
                                            type="url"
                                            value={data.website_link || ''}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("website_link", e.target.value)}
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.website_link} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="social_link1"
                                            value="Social Link 1"
                                            className="col-span-3"
                                        />
                                        <TextInput
                                            id="social_link1"
                                            type="url"
                                            value={data.social_link1 || ''}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("social_link1", e.target.value)}
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.social_link1} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="social_link2"
                                            value="Social Link 2"
                                            className="col-span-3"
                                        />
                                        <TextInput
                                            id="social_link2"
                                            type="url"
                                            value={data.social_link2 || ''}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("social_link2", e.target.value)}
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.social_link2} />
                                    <div className="grid grid-cols-12 items-center">
                                        <InputLabel
                                            htmlFor="social_link3"
                                            value="Social Link 3"
                                            className="col-span-3"
                                        />
                                        <TextInput
                                            id="social_link3"
                                            type="url"
                                            value={data.social_link3 || ''}
                                            className="col-span-9 w-full"
                                            onChange={(e) => setData("social_link3", e.target.value)}
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.social_link3} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanelLayout>
    )
}