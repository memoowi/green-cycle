import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-4 text-base font-medium leading-5 transition duration-300 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-emerald-600 text-gray-900 dark:text-gray-100 font-bold focus:border-indigo-700 '
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-emerald-500 hover:border-emerald-500 dark:hover:text-emerald-500 focus:text-emerald-700 focus:border-emerald-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
