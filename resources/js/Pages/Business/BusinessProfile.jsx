import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import BusinessPanelLayout from '@/Layouts/BusinessPanelLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function BusinessProfile({ auth }) {
    const business = usePage().props.auth.business;

    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm ({
        business_name: business.business_name,
        province: business.province,
        regency: business.regency,
        district: business.district,
        address: business.address,
        postal_code: business.postal_code,
        business_number: business.business_number,
        business_email: business.business_email,
    });

    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(true);
    }

    const handleCancel = () => {
        setEdit(false);
    }

    useEffect(() => {
        setEdit(false);
    }, []);

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
                        <div className='bg-white w-full h-60 relative'>
                            <div className='w-full h-3/4 bg-green-500'></div>
                            <div className='bg-slate-200 w-40 h-40 absolute rounded-lg z-10 bottom-0 left-10'>
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

                        <div className='text-end'>
                            <button 
                                className={'bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-700' + (edit ? ' hidden' : '')}
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        </div>
                        
                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Status</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    {auth.business.status === 1 ? (
                                        <span className='text-xs text-white bg-emerald-600 px-3 py-1 rounded select-none'>Active</span>
                                    ) : (
                                        <span className='text-xs text-white bg-red-600 px-3 py-1 rounded select-none'>Inactive</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <InputLabel htmlFor="business_name" value="Business Name"/>
                                <TextInput 
                                    id="business_name" 
                                    type="text" 
                                    name="business_name" 
                                    className='w-3/4' 
                                    value={data.business_name} 
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    disabled={!edit} 
                                    required
                                />
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Description</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    {auth.business.description }
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Address</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    {auth.business.address }
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>District</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    {auth.business.district }
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Regency</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    {auth.business.regency }
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Province</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    {auth.business.province }
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Postal Code</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    {auth.business.postal_code }
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Contact Number</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    {auth.business.business_number }
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Business Email</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    {auth.business.business_email }
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Website</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    <Link href={auth.business.website_link}>{auth.business.website_link}</Link>
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Social 1</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    <Link href={auth.business.social_link1}>{auth.business.social_link1}</Link>
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Social 2</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    <Link href={auth.business.social_link2}>{auth.business.social_link2}</Link>
                                </p>
                            </div>
                        </div>

                        <div className='text-gray-900 dark:text-white'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Social 3</p>
                                <p className='w-3/4 p-3 rounded-md bg-gray-200 dark:bg-gray-800'>
                                    <Link href={auth.business.social_link3}>{auth.business.social_link3}</Link>
                                </p>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </BusinessPanelLayout>
    );
}
