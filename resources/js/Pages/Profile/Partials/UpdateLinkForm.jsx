import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";

export default function UpdateLinkForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        website_link: user.website_link,
        social_link1: user.social_link1,
        social_link2: user.social_link2,
        social_link3: user.social_link3,
        social_link4: user.social_link4,
    });

    const submit = (e) => {
        e.preventDefault();

        // console.log(data);
        patch(route('profile.updatelink'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Social Media Links</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's Social Media Links. Make sure to include the http:// or https://
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="website_link" value="Website Link" />

                    <TextInput
                        id="website_link"
                        type="url"
                        className="mt-1 block w-full"
                        value={data.website_link || ''}
                        onChange={(e) => setData('website_link', e.target.value)}
                    />

                    <InputError className="mt-2" 
                    message={errors.website_link}
                     />
                </div>

                <div>
                    <InputLabel htmlFor="social_link1" value="Social Link 1" />

                    <TextInput
                        id="social_link1"
                        type="url"
                        className="mt-1 block w-full"
                        value={data.social_link1 || ''}
                        onChange={(e) => setData('social_link1', e.target.value)}
                    />

                    <InputError className="mt-2" 
                    message={errors.social_link1}
                     />
                </div>

                <div>
                    <InputLabel htmlFor="social_link2" value="Social Link 2" />

                    <TextInput
                        id="social_link2"
                        type="url"
                        className="mt-1 block w-full"
                        value={data.social_link2 || ''}
                        onChange={(e) => setData('social_link2', e.target.value)}
                    />

                    <InputError className="mt-2" 
                    message={errors.social_link2}
                     />
                </div>

                <div>
                    <InputLabel htmlFor="social_link3" value="Social Link 3" />

                    <TextInput
                        id="social_link3"
                        type="url"
                        className="mt-1 block w-full"
                        value={data.social_link3 || ''}
                        onChange={(e) => setData('social_link3', e.target.value)}
                    />

                    <InputError className="mt-2" 
                    message={errors.social_link3}
                     />
                </div>

                <div>
                    <InputLabel htmlFor="social_link4" value="Social Link 4" />

                    <TextInput
                        id="social_link4"
                        type="url"
                        className="mt-1 block w-full"
                        value={data.social_link4 || ''}
                        onChange={(e) => setData('social_link4', e.target.value)}
                    />

                    <InputError className="mt-2" 
                    message={errors.social_link4}
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
    );
}