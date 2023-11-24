import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium leading-5 transition duration-300 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-gray-900 font-bold focus:border-indigo-700 '
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-400 focus:text-gray-900 focus:border-gray-500 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
