import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function AdminSideBar({ className='', handleClick, username, email}) {
    return (
        <aside className={className + ' md:translate-x-0 md:opacity-100 absolute md:static z-10 left-0 min-w-[250px] h-screen bg-blue-400 bg-opacity-25 md:bg-opacity-100 backdrop-blur-sm transition duration-500 ease-in-out'}>
            <div className='flex items-center justify-between px-4 h-16 border-b border-gray-100'>
                <Link href='/'>
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                </Link>
                <button
                    onClick={handleClick}
                    className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none  transition duration-150 ease-in-out"
                >
                    <svg className="h-6 w-6" stroke="black" fill="none" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div className="p-4">
                <div className="font-medium text-base text-gray-800">{username}</div>
                <div className="font-medium text-sm text-gray-500">{email}</div>
            </div>
            <ul>
                <li>
                    <ResponsiveNavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink>
                        Posts
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink>
                        Users
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink>
                        Items
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink>
                        Recycle Facilities
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink>
                        Rewards
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink>
                        Recycled Reports
                    </ResponsiveNavLink>
                </li>
            </ul>
            <div className="pt-2 pb-1 border-t border-gray-200">
                <div className="mt-3 space-y-1">
                    <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                        Log Out
                    </ResponsiveNavLink>
                </div>
            </div>  
        </aside>
    );
}