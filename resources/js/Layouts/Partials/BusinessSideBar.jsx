import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import SidebarLink from '@/Components/SidebarLink';
import ResponsiveUserInformation from '@/Components/ResponsiveUserInformation';
import ResponsiveBusinessInformation from '@/Components/ResponsiveBusinessInformation';

export default function BusinessSideBar({ className='', handleClick, username, email, photo, bname, bemail, bphoto, bstatus }) {
    return (
        <aside className={className + ' md:translate-x-0 md:opacity-100 fixed z-50 min-w-[270px] h-screen bg-white bg-opacity-90 md:bg-opacity-100 dark:bg-slate-800 backdrop-blur-sm transition duration-500 ease-in-out'}>
            <div className='flex items-center justify-between px-4 h-16 border-b border-gray-100 dark:border-slate-600'>
                <Link href='/'>
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-white" />
                </Link>
                <button
                    onClick={handleClick}
                    className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none  transition duration-150 ease-in-out"
                >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div className="py-4">
                <ResponsiveUserInformation
                    username={username}
                    email={email}
                    photo={photo}
                />
            </div>
            <div className="py-4">
                <ResponsiveBusinessInformation
                    bname={bname}
                    bemail={bemail}
                    bphoto={bphoto} 
                    bstatus={bstatus}
                />
            </div>
            <ul>
                <li>
                    <SidebarLink href={route('business.dashboard')} active={route().current('business.dashboard')}>
                        Dashboard
                    </SidebarLink>
                </li>
            </ul>
            <div className="pt-2 pb-1 border-t border-gray-200 dark:border-slate-600">
                <div className="mt-3 space-y-1">
                    <ResponsiveNavLink href={route('business.profile')} active={route().current('business.profile')}>Business Profile</ResponsiveNavLink>
                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                        Log Out
                    </ResponsiveNavLink>
                </div>
            </div>  
        </aside>
    );
}