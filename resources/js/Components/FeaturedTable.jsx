export default function FeaturedTable({ placeholderSearch = "Search", valueInputSearch, onChangeSearch, classTable = "", children, previousClick, disabledPrevious, nextClick, disabledNext, paginationInfo }) {
    return (
        <div>
            <div className="flex items-center justify-between ms-1 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                        placeholder={placeholderSearch}
                        value={valueInputSearch}
                        onChange={onChangeSearch}
                    />
                </div>
            </div>

            <div className={"relative overflow-x-auto shadow sm:rounded-lg " + classTable } >
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {children}
                </table>
            </div>
            
            <div className="flex items-center justify-end mt-4 text-gray-500 dark:text-gray-400 select-none">
                <button
                    onClick={previousClick}
                    disabled={disabledPrevious}
                    className="pl-5 pr-3 py-1  border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:disabled:bg-gray-700 rounded-s-full mr-2"
                >
                    Previous
                </button>
                <span>
                    {paginationInfo}
                </span>
                <button
                    onClick={nextClick}
                    disabled={disabledNext}
                    className="pl-3 pr-5 py-1  border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:disabled:bg-gray-700 rounded-e-full ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
