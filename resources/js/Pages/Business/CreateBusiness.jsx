import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Register() {

    const { data, setData, post, processing, errors, reset } = useForm({
        business_name: '',
        province: '',
        regency: '',
        district: '',
        address: '',
        postal_code: '',
        business_number: '',
        business_email: '',
    });

    // console.log(data);

    const [provinceOptions, setProvinceOptions] = useState([]);
    const [regencyOptions, setRegencyOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const apiKey = '3f186c55e75f77bf6d20929f93d71dafb3e0a0f4ca1031680b5eb31602d1dc37';
    
    useEffect(() => {
        const fetchProvinceOptions = async () => {
            try {
                const apiUrl = `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`;

                const response = await axios.get(apiUrl);
                const data = response.data;
                // console.log(data);
                setProvinceOptions(Object.values(data[ 'value' ]));
                // console.log(Object.values(data[ 'value' ]));
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
    
                const response = await axios.get(apiUrl);
                const regencyData = response.data; // Use a different variable name here
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
    
                const response = await axios.get(apiUrl);
                const districtData = response.data; // Use a different variable name here
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

        // console.log(data);
        post(route('business.new.'));
    };

    return (
        <GuestLayout>
            <Head title="Create New Business" />

            <form onSubmit={submit} className='space-y-3'>
                <div>
                    <InputLabel htmlFor="business_name" value="Business Name" />

                    <TextInput
                        id="business_name"
                        name="business_name"
                        value={data.business_name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('business_name', e.target.value)}
                        required
                    />

                    <InputError 
                    message={errors.business_name} 
                    className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="province" value="Province" />

                    <select
                        id="province"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.province}
                        onChange={(e) => setData('province', e.target.value)}
                        required
                    >
                        <option value="" disabled>-- SELECT PROVINCE --</option>
                    {provinceOptions.map((province) => (
                        <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                    </select>

                    <InputError className="mt-2" 
                    message={errors.province} 
                    />
                </div>

                <div>
                    <InputLabel htmlFor="regency" value="Regency" />

                    <select
                        id="regency"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.regency}
                        onChange={(e) => setData('regency', e.target.value)}
                        required
                        {...(data.province ? { disabled: false } : { disabled: true })}
                    >
                        <option value="" disabled>-- SELECT REGENCY --</option>
                    {regencyOptions.map((regency) => (
                        <option key={regency.id} value={regency.id}>{regency.name}</option>
                    ))}
                    </select>

                    <InputError className="mt-2" 
                    message={errors.regency} 
                    />
                </div>

                <div>
                    <InputLabel htmlFor="district" value="District" />

                    <select
                        id="district"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.district}
                        onChange={(e) => setData('district', e.target.value)}
                        required 
                        {...(data.regency ? { disabled: false } : { disabled: true })}
                    >
                        <option value="" disabled>-- SELECT DISTRICT --</option>
                    {districtOptions.map((district) => (
                        <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
                    </select>

                    <InputError className="mt-2" 
                    message={errors.district} 
                    />
                </div>
                
                <div>
                    <InputLabel htmlFor="address" value="Business Address" />

                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />

                    <InputError 
                    message={errors.address} 
                    className="mt-2" />
                </div>
                
                <div>
                    <InputLabel htmlFor="postal_code" value="Postal Code" />

                    <TextInput
                        id="postal_code"
                        name="postal_code"
                        value={data.postal_code}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('postal_code', e.target.value)}
                        required
                    />

                    <InputError 
                    message={errors.postal_code} 
                    className="mt-2" />
                </div>
                
                <div>
                    <InputLabel htmlFor="business_number" value="Business Contact Number" />

                    <TextInput
                        id="business_number"
                        name="business_number"
                        type="tel"
                        value={data.business_number}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('business_number', e.target.value)}
                        required
                    />

                    <InputError 
                    message={errors.business_number} 
                    className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="business_email" value="Business Email" />

                    <TextInput
                        id="business_email"
                        name="business_email"
                        type="email"
                        value={data.business_email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('business_email', e.target.value)}
                        required
                    />

                    <InputError 
                    message={errors.business_email} 
                    className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
