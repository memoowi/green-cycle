import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";

export default function UpdateLinkForm({ className = '' }) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Link</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="website_link" value="Website Link" />

                    <TextInput
                        id="website_link"
                        type="url"
                        className="mt-1 block w-full"
                        // value={data.name}
                        // onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError className="mt-2" 
                    // message={errors.name}
                     />
                </div>

                <div>
                    <InputLabel htmlFor="social_link1" value="Social Link 1" />

                    <TextInput
                        id="social_link1"
                        type="url"
                        className="mt-1 block w-full"
                        // value={data.name}
                        // onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError className="mt-2" 
                    // message={errors.name}
                     />
                </div>

                <div>
                    <InputLabel htmlFor="social_link2" value="Social Link 2" />

                    <TextInput
                        id="social_link2"
                        type="url"
                        className="mt-1 block w-full"
                        // value={data.name}
                        // onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError className="mt-2" 
                    // message={errors.name}
                     />
                </div>

                <div>
                    <InputLabel htmlFor="social_link3" value="Social Link 3" />

                    <TextInput
                        id="social_link3"
                        type="url"
                        className="mt-1 block w-full"
                        // value={data.name}
                        // onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError className="mt-2" 
                    // message={errors.name}
                     />
                </div>

                <div>
                    <InputLabel htmlFor="social_link4" value="Social Link 4" />

                    <TextInput
                        id="social_link4"
                        type="url"
                        className="mt-1 block w-full"
                        // value={data.name}
                        // onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError className="mt-2" 
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
    );
}