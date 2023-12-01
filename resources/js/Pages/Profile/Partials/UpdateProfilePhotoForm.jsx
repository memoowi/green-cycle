import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";

export default function UpdateProfilePhoto({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        profile_photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        
        // console.log(data);
        // console.log(data.profile_photo);
        post(route('profile.updatephoto'));

        e.target.reset(); // Reset the form
    };

    const handleFileChange = (e) => {
        setData('profile_photo', e.target.files[0]);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Profile Photo</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Add or change your profile photo.<br />
                    For better results, use an image with 1x1 aspect ratio.
                </p>
            </header>
            <div className="mt-6 ms-6">
                <img
                    src={user.profile_photo ? ('/storage/profile-photos/' + user.profile_photo) : ('/storage/profile-photos/default.jpg')}
                    alt={user.name}
                    className="w-20 h-20 rounded-full border-2 object-cover"
                />
            </div>
            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="profile_photo" value="Profile Photo" />
                    
                    <TextInput
                        id="profile_photo"
                        type="file"
                        name="profile_photo"
                        accept="image/*"
                        className="mt-1 block w-full  file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-emerald-100 file:text-emerald-700
                        hover:file:bg-emerald-200"
                        // value={data.profile_photo || ''}
                        onChange={handleFileChange}
                    />

                    <InputError 
                    className="mt-2" 
                    message={errors.profile_photo} 
                    />
                </div>
                
                <div className="flex items-center gap-4">
                    <PrimaryButton 
                    disabled={processing}
                    >
                        Save
                    </PrimaryButton>

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
    )
}