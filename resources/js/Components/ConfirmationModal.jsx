import Modal from "./Modal";

export default function ConfirmationModal({ show = false, onClose, title, content, onSubmit } ) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="max-h-full w-[92vw] sm:w-full bg-white dark:bg-gray-700">
                {/* Modal content */}
                <div className="flex items-start justify-between p-4 border-b dark:border-gray-600">
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
                <div className="flex justify-center p-5">
                    <svg
                        className="w-24 h-24 text-yellow-500 dark:text-yellow-400 animate-[pulse_1s_ease-in-out_infinite]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>
                <p className="text-center text-lg text-gray-600 dark:text-gray-300">
                    {content}
                </p>
                <div className="flex p-6 justify-center gap-4">
                    <form onSubmit={onSubmit}>
                        <button className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-xl px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">
                            Yes
                        </button>
                    </form>
                    <button
                        onClick={onClose}
                        className="text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-xl px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}
