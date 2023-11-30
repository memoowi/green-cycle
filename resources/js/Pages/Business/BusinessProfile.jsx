import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import BusinessPanelLayout from '@/Layouts/BusinessPanelLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function BusinessProfile({ auth }) {
    const business = usePage().props.auth.business;

    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm ({
        status : business.status,
        business_name: business.business_name,
        description: business.description,
        address: business.address,
        district: business.district,
        regency: business.regency,
        province: business.province,
        postal_code: business.postal_code,
        business_number: business.business_number,
        business_email: business.business_email,
    });

    const [edit, setEdit] = useState(false);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [regencyOptions, setRegencyOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    // const apiKey = '3f186c55e75f77bf6d20929f93d71dafb3e0a0f4ca1031680b5eb31602d1dc37';
    
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

    const handleEdit = () => {
        setEdit(true);
    }

    const handleCancel = () => {
        setData(business);
        setEdit(false);
    }

    const submit = (e) => {
        e.preventDefault();

        // console.log(data);

        // patch(route('business.update', auth.business.id), {
        //     onSuccess: () => setEdit(false),
        // });
    }

    return (
        <BusinessPanelLayout
            user={auth.user}
            business={auth.business}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Business Profile</h2>}
        >
            <Head title="Business Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className='sm:rounded-t-lg overflow-hidden'>
                        <div className='bg-white dark:bg-slate-700 w-full h-60 relative'>
                            <div 
                                className='w-full h-3/4 bg-slate-400 bg-cover' 
                                style={ auth.business.business_banner && { backgroundImage: `url('/storage/business-banner/${auth.business.business_banner}')` } }>
                            </div>
                            <div className='bg-slate-200 w-32 md:w-40 h-32 md:h-40 absolute rounded-lg z-10 bottom-0 left-10'>
                                <img
                                    src={ auth.business.business_photo ? '/storage/profile-photos' + auth.business.business_photo : '/storage/profile-photos/business-default.png'}
                                    className='w-full h-full object-cover rounded-lg' />
                            </div>
                        </div>
                    </div>

                    <form 
                        onSubmit={submit} 
                        className="space-y-4 p-7 sm:p-10 bg-white dark:bg-slate-700 overflow-hidden shadow-sm sm:rounded-b-lg"
                    >

                        <div className='text-end space-x-4'>
                            <button 
                                className={'bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-700' + (edit ? ' hidden' : '')}
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>

                            <button 
                                className={'bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700' + (!edit ? ' hidden' : '')}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                            <button 
                                className={'bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-700' + (!edit ? ' hidden' : '')}
                                onClick={submit}
                            >
                                Save
                            </button>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="status" value="Status"/>
                                <select 
                                    id="status"
                                    name="status" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.status} 
                                    onChange={(e) => setData('status', e.target.value)}
                                    disabled={!edit} 
                                    required
                                >
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                </select>

                                <InputError className="mt-2" 
                                    message={errors.status} 
                                />
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="business_name" value="Business Name"/>
                                <TextInput 
                                    id="business_name" 
                                    type="text" 
                                    name="business_name" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.business_name} 
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    disabled={!edit} 
                                    required
                                />
                                <InputError className="mt-2" 
                                    message={errors.business_name} 
                                />
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="description" value="Description"/>
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent resize-none')}  
                                    value={data.description || ''} 
                                    onChange={(e) => setData('description', e.target.value)}
                                    disabled={!edit} 
                                />
                                <InputError className="mt-2" 
                                    message={errors.description} 
                                />
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="address" value="Business Address"/>
                                <TextInput 
                                    id="address" 
                                    type="text" 
                                    name="address" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.address} 
                                    onChange={(e) => setData('address', e.target.value)}
                                    disabled={!edit} 
                                    required
                                />
                                <InputError className="mt-2" 
                                    message={errors.address} 
                                />
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="province" value="Province" />
            
                                <select
                                    id="province"
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')} 
                                    value={data.province || ''}
                                    onChange={(e) => setData('province', e.target.value)} 
                                    disabled={!edit} 
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
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="regency" value="Regency" />
            
                                <select
                                    id="regency"
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')} 
                                    value={data.regency || ''}
                                    onChange={(e) => setData('regency', e.target.value)}
                                    required 
                                    disabled={!edit} 
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
                        </div>
        
                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="district" value="District" />
            
                                <select
                                    id="district"
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')} 
                                    value={data.district || ''}
                                    onChange={(e) => setData('district', e.target.value)}
                                    required 
                                    disabled={!edit} 
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
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="postal_code" value="Postal Code"/>
                                <TextInput 
                                    id="postal_code" 
                                    type="text" 
                                    name="postal_code" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.postal_code} 
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                    disabled={!edit} 
                                    required
                                />
                                <InputError className="mt-2" 
                                    message={errors.postal_code} 
                                />
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="business_number" value="Contact Number"/>
                                <TextInput 
                                    id="business_number" 
                                    type="tel" 
                                    name="business_number" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.business_number} 
                                    onChange={(e) => setData('business_number', e.target.value)}
                                    disabled={!edit} 
                                    required
                                />
                                <InputError className="mt-2" 
                                    message={errors.business_number} 
                                />
                            </div>
                        </div>
                        
                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="business_email" value="Contact Email"/>
                                <TextInput 
                                    id="business_email" 
                                    type="email" 
                                    name="business_email" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.business_email} 
                                    onChange={(e) => setData('business_email', e.target.value)}
                                    disabled={!edit} 
                                    required
                                />
                                <InputError className="mt-2" 
                                    message={errors.business_email} 
                                />
                            </div>
                        </div>
                        
                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="website_link" value="Website"/>
                                <TextInput 
                                    id="website_link" 
                                    type="url" 
                                    name="website_link" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.website_link || ''} 
                                    onChange={(e) => setData('website_link', e.target.value)}
                                    disabled={!edit} 
                                />
                                <InputError className="mt-2" 
                                    message={errors.website_link} 
                                />
                            </div>
                        </div>
                        
                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="social_link1" value="Social Media 1"/>
                                <TextInput 
                                    id="social_link1" 
                                    type="url" 
                                    name="social_link1" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.social_link1 || ''} 
                                    onChange={(e) => setData('social_link1', e.target.value)}
                                    disabled={!edit} 
                                />
                                <InputError className="mt-2" 
                                    message={errors.social_link1} 
                                />
                            </div>
                        </div>
                        
                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="social_link2" value="Social Media 2"/>
                                <TextInput 
                                    id="social_link2" 
                                    type="url" 
                                    name="social_link2" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.social_link2 || ''} 
                                    onChange={(e) => setData('social_link2', e.target.value)}
                                    disabled={!edit} 
                                />
                                <InputError className="mt-2" 
                                    message={errors.social_link2} 
                                />
                            </div>
                        </div>
                        
                        <div className='text-gray-900 dark:text-white'>
                            <div className='sm:flex justify-between items-center w-full'>
                                <InputLabel htmlFor="social_link3" value="Social Media 3"/>
                                <TextInput 
                                    id="social_link3" 
                                    type="url" 
                                    name="social_link3" 
                                    className={'w-full sm:w-3/4 ' + (edit ? 'bg-gray-50 border-emerald-500' : 'bg-gray-200 border-transparent')}  
                                    value={data.social_link3 || ''} 
                                    onChange={(e) => setData('social_link3', e.target.value)}
                                    disabled={!edit} 
                                />
                                <InputError className="mt-2" 
                                    message={errors.social_link3} 
                                />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </BusinessPanelLayout>
    );
}
