import { Link } from '@inertiajs/react';

export default function SidebarLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`flex items-start my-2 mx-4 px-4 py-3 rounded-md ${
                active
                    ? 'font-extrabold text-white bg-emerald-600 focus:bg-emerald-700'
                    : 'font-medium text-gray-600 hover:text-gray-800 hover:bg-slate-100 focus:bg-slate-200 dark:text-gray-200 dark:hover:text-gray-300 dark:hover:bg-slate-700 dark:focus:bg-slate-800'
            } text-base focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
