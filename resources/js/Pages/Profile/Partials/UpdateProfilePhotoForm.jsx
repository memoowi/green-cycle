import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";

export default function UpdateProfilePhoto({ className = '' }) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>
            <form className="mt-6 space-y-6">
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
                        // value={data.name}
                        // onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError 
                    className="mt-2" 
                    // message={errors.name} 
                    />
                </div>
                
                <div className="flex items-center gap-4">
                    <PrimaryButton 
                    // disabled={processing}
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        // show={recentlySuccessful}
                        show={false}
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