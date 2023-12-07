import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function UpdateLocationInformation({ className = '' }) {
    // const user = usePage().props.auth.user;
    const location = usePage().props.auth.location;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        address: location.address,
        province: location.province,
        regency: location.regency,
        district: location.district,
        postal_code: location.postal_code,
        phone_number: location.phone_number
    });
    
    // console.log(location.postal_code);
    
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

        // console.log(data);
        patch(route('location.update'), {
            preserveScroll: true,
            
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Location Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your location Information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="province" value="Province" />

                    <select
                        id="province"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.province || ''}
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
                        value={data.regency || ''}
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
                        value={data.district || ''}
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
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.address || ''}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                        autoComplete="address"
                    />

                    <InputError className="mt-2" 
                    message={errors.address} 
                    />
                </div>

                <div>
                    <InputLabel htmlFor="postal_code" value="Postal Code" />

                    <TextInput
                        id="postal_code"
                        className="mt-1 block w-full"
                        value={data.postal_code || ''}
                        onChange={(e) => setData('postal_code', e.target.value)}
                        required
                        autoComplete="postal_code"
                    />

                    <InputError className="mt-2" 
                    message={errors.postal_code} 
                    />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                    <TextInput
                        id="phone_number"
                        type='tel'
                        className="mt-1 block w-full"
                        value={data.phone_number || ''}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        required
                        autoComplete="phone_number"
                    />

                    <InputError className="mt-2" 
                    message={errors.phone_number} 
                    />
                </div>

                <div>
                    <LoadScript
                        googleMapsApiKey={'AIzaSyD769lwJj6tjdoWTo5tsBy7SXmPYp602vA'}
                    >
                        <GoogleMap
                            mapContainerStyle={{ height: '400px', width: '100%' }}
                            center={{ lat: -6.1944, lng: 106.8229 }}
                            zoom={8}
                        >

                            <Marker
                                draggable
                                position={{ lat: -6.1944, lng: 106.8229 }}
                            />
                        </GoogleMap>
                    </LoadScript>

                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

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
        </section>
    );
}
