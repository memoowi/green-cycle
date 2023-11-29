import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'border-emerald-400 text-emerald-700 bg-emerald-100 focus:text-emerald-800 focus:bg-emerald-100 focus:border-emerald-700 dark:bg-emerald-600 dark:text-gray-200 dark:focus:text-gray-300 dark:focus:bg-emerald-700 dark:focus:border-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-200 focus:border-gray-300 dark:text-gray-200 dark:hover:text-gray-300 dark:hover:bg-slate-700 dark:hover:border-slate-600 dark:focus:text-gray-300 dark:focus:bg-slate-700 dark:focus:border-slate-600'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
