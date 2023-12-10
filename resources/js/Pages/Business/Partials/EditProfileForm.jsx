import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function EditProfileForm({ auth }) {
    const business = usePage().props.auth.business;
    // console.log(business);

    const {data, setData, post, errors, processing, recentlySuccessful} = useForm ({
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

    const [edit, setEdit] = useState(false);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [regencyOptions, setRegencyOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const bannerRef = useRef(null);
    const photoRef = useRef(null);
    
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

    const handleEdit = () => {
        setEdit(true);
    }

    const handleCancel = () => {
        setData({ ...business });

        // Reset the file input value
        if (bannerRef.current) {
            bannerRef.current.value = '';
        }

        if (photoRef.current) {
            photoRef.current.value = '';
        }
        Object.keys(errors).forEach((key) => {
            errors[key] = null;
        });

        setEdit(false);
    }

    const submit = (e) => {
        e.preventDefault();

        // console.log(data);

        post(route('business.profile.update'), {
            onSuccess: () => {
                bannerRef.current.value = '';
                photoRef.current.value = '';
                toast.success('Business Profile updated successfully.');
                setEdit(false)
            },
        });

    }
    return (
        <div className='relative'>
            <div className='sm:me-6 md:me-6 lg:me-8 absolute z-10 right-0'>
                <button 
                    className={'me-10 mt-60 bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-700' + (edit ? ' hidden' : '')}
                    onClick={handleEdit}
                >
                Edit Profile
                </button>
                <button 
                    className={'me-6 mt-[16.75rem] sm:me-10 sm:mt-[17.5rem] bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700' + (!edit ? ' hidden' : '')}
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
            <form onSubmit={submit} className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className='sm:rounded-t-lg overflow-hidden'>
                    <div className='bg-white dark:bg-slate-700 w-full h-60 relative'>
                        <div 
                            className='w-full h-3/4 bg-slate-400 bg-cover relative' 
                            style={ business.business_banner && { backgroundImage: `url('/storage/b-photos/${business.business_banner}')` } }
                        >
                            <InputLabel
                                htmlFor="business_banner"
                                value="Click to Change Banner"
                                className={!edit ? ('hidden') : (" bg-emerald-500 bg-opacity-40 absolute z-10 cursor-pointer w-full h-full flex items-center justify-center")}
                                onClick={handleEdit}
                            />
                            <TextInput
                                type="file"
                                className="hidden"
                                id="business_banner"
                                name="business_banner"
                                accept="image/*"
                                onChange={(e) => setData('business_banner', e.target.files[0])}
                                ref={bannerRef}
                            />
                        </div>
                        <div className='bg-slate-200 w-32 md:w-40 h-32 md:h-40 absolute rounded-lg z-20 bottom-0 left-10'>
                            <div className='w-full h-full rounded-lg overflow-hidden relative'>
                                <img
                                    src={ business.business_photo ? '/storage/b-photos/' + business.business_photo : '/storage/b-photos/business-default.png'}
                                    className='w-full h-full object-cover' 
                                />
                                <InputLabel
                                    htmlFor="business_photo"
                                    value="Click to Change Photo"
                                    className={!edit ? ('hidden') : (" bg-blue-600 text-gray-100 bg-opacity-40 absolute z-30 cursor-pointer w-full h-full top-0 flex justify-center items-center text-center")}
                                    onClick={handleEdit}
                                />
                                <TextInput
                                    type="file"
                                    className="absolute top-0 hidden"
                                    id="business_photo"
                                    name="business_photo"
                                    accept="image/*"
                                    onChange={(e) => setData('business_photo', e.target.files[0])}
                                    ref={photoRef}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 p-7 sm:p-10 bg-white dark:bg-slate-700 overflow-hidden shadow-sm sm:rounded-b-lg">

                    <div className='text-end me-20'>
                        <button 
                            className={'bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-700' + (!edit ? ' hidden' : '')}
                            onClick={submit}
                        >
                            Save
                        </button>
                    </div>

                    <div>
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
                        </div>
                        <InputError className="mt-2" message={errors.business_name} />
                    </div>

                    <div>
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
                        </div>
                        <InputError className="mt-2" message={errors.description} />
                    </div>

                    <div>
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
                        </div>
                        <InputError className="mt-2"  message={errors.address} />
                    </div>

                    <div>
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
        
                        </div>
                        <InputError className="mt-2" message={errors.province} />
                    </div>

                    <div>
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
        
                        </div>
                        <InputError className="mt-2" message={errors.regency} />
                    </div>

                    <div>
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
        
                        </div>
                        <InputError className="mt-2" message={errors.district} />
                    </div>

                    <div>
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
                        </div>
                        <InputError className="mt-2"  message={errors.postal_code} />
                    </div>

                    <div>
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
                        </div>
                        <InputError className="mt-2" message={errors.business_number} />
                    </div>
                    
                    <div>
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
                        </div>
                        <InputError className="mt-2" message={errors.business_email} />
                    </div>
                    
                    <div>
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
                        </div>
                        <InputError className="mt-2" message={errors.website_link} />
                    </div>
                    
                    <div>
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
                        </div>
                        <InputError className="mt-2" message={errors.social_link1} />
                    </div>
                    
                    <div>
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
                        </div>
                        <InputError className="mt-2" message={errors.social_link2} />
                    </div>
                    
                    <div>
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
                        </div>
                        <InputError className="mt-2" message={errors.social_link3} />
                    </div>

                </div>
            </form>
        </div>
    );
}