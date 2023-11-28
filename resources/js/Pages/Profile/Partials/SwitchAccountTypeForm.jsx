import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function SwitchAccountType({ className = '' }) {
    const user = usePage().props.auth.user;

    const [confirmingChangeType, setConfirmingChangeType] = useState(false);

    const confirmChangeType = () => {
        setConfirmingChangeType(true);
    };

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        type: user.type
    });

    const submit = (e) => {
        e.preventDefault();

        // console.log(data);
        patch(route('profile.updatetype'),{
            onSuccess: () => closeModal(),
        });

        
    };

    const closeModal = () => {
        setConfirmingChangeType(false);
    };

    return (
        <section className={'space-y-6 ' + className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Switch Account Type</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account type.
                </p>
            </header>

            <SecondaryButton
                onClick={confirmChangeType}
            >
                Change Account Type
            </SecondaryButton>

                <Modal show={confirmingChangeType} onClose={closeModal}>
                    <form onSubmit={submit} className="p-6 space-y-6 w-screen">
                        <div>
                            <InputLabel htmlFor="type" value="Switch Account Type" className="text-xl mb-4" />
                            <select
                                id="type"
                                className="mt-1 block w-52 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                required
                            >
                                <option value="0">Basic</option>
                                <option value="1">Bussiness</option>
                            </select>

                            <InputError 
                            className="mt-2" 
                            message={errors.type} 
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
                </Modal>
        </section>
    )
}
