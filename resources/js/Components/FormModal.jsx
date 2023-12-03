import { Transition } from "@headlessui/react";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";

export default function FormModal({ title, children, show = false, onClose, onSubmit, processing, recentlySuccessful}) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="relative max-h-full">
                <div className="flex items-start justify-between p-4 border-b bg-white dark:bg-gray-700 dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form
                    onSubmit={onSubmit}
                    className="relative bg-white  shadow dark:bg-gray-700 w-full"
                >
                    <div className="p-6 space-y-6 w-[92vw] sm:w-full max-h-[600px] overflow-y-auto">
                        <div className="grid grid-cols-12 gap-4">
                            {children}
                        </div>
                    </div>
                    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                        <PrimaryButton disabled={processing} onClick={onSubmit}>
                            Save All
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
            </div>
        </Modal>
    );
}
