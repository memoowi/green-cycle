import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function SettingForm() {
    const business = usePage().props.auth.business;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        status: business.status,
    });

    const [confirmingChangeStatus, setConfirmingChangeStatus] = useState(false);
    const confirmChangeStatus = () => {
        setConfirmingChangeStatus(true);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('business.setting.update'), {
            onSuccess: () => setConfirmingChangeStatus(false),

        });
    };

    const closeModal = () => {
        setData({ status: business.status });
        setConfirmingChangeStatus(false);
    };
    return (
        <section>
            <div>
                <h2 className="text-lg font-medium text-gray-900">Business Settings</h2>
                <div className="my-2 select-none">
                    {business.status === 1 ? (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-lg font-bold bg-green-100 text-green-800">
                            Active
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-lg font-bold bg-red-100 text-red-800">
                            Inactive
                        </span>
                    )}
                </div>
                <p className="mt-1 text-sm text-gray-600">
                    Update your business's status.
                </p>
            </div>
            <div className="flex gap-4 items-center mt-4">
                <SecondaryButton
                    disabled={processing}
                    onClick={confirmChangeStatus}
                >
                    Change Business Status
                </SecondaryButton>

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


            <Modal
                show={confirmingChangeStatus}
                onClose={closeModal}
            >
                <form onSubmit={submit}>
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">
                                Change Business Status
                            </h2>

                            <button
                                type="button"
                                onClick={closeModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-4">
                            <InputLabel className="relative inline-flex items-center cursor-pointer">
                                <TextInput type="checkbox" value={data.status} className="sr-only peer" onChange={(e) => setData('status', e.target.checked ? 1 : 0)} checked={data.status == 1} />
                                <div className="w-11 h-6 bg-red-400  rounded-full peer dark:bg-red-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white peer-checked:bg-emerald-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Change Status</span>
                            </InputLabel>

                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />

                        </div>

                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
                        <SecondaryButton
                            onClick={closeModal}
                        >
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton
                            className="ml-3"
                            disabled={processing}
                        >
                            Change
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    )
}