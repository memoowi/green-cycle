import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Register() {
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        business_name: '',
        address: '',
        postal_code: '',
        business_number: '',
        business_email: '',
    });

    // console.log(user.name);

    const submit = (e) => {
        e.preventDefault();

        console.log(data.business_name);
        // post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Create New Business" />

            <form className='space-y-3'>
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
