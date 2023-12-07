import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import DarkModeToggle from '@/Components/DarkModeToggle';
import ResponsiveButton from '@/Components/ResponsiveButton';
import NavDropdown from '@/Components/NavDropdown';
import ResponsiveUserInformation from '@/Components/ResponsiveUserInformation';

export default function Landing({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
            <nav className="flex justify-center w-full fixed z-50 bg-white dark:bg-slate-800 bg-opacity-90 backdrop-blur-sm border-b border-gray-300 dark:border-slate-700">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className='flex gap-3  text-gray-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-500'>
                                    <ApplicationLogo className="block h-9 w-auto fill-current" />
                                    <span className='text-2xl font-bold hidden lg:block'>GreenCycle</span>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden space-x-6 md:-my-px sm:ms-10 md:flex">
                            <NavLink href={route('recycle-an-item')} active={route().current('recycle-an-item')}>
                                Recycle an Item
                            </NavLink>
                            <NavLink href={route('where-to-recycle')} active={route().current('where-to-recycle')}>
                                Where to Recycle
                            </NavLink>
                            <NavLink href='/'>
                                How it works
                            </NavLink>
                            <NavLink href='/'>
                                Blog
                            </NavLink>
                            <NavLink href='/'>
                                How to recycle
                            </NavLink>
                            <NavLink href='/'>
                                About GreenCycle
                            </NavLink>
                        </div>

                        <div className="flex md:items-center md:ms-6">
                            <DarkModeToggle className='self-center mt-1 mx-2'/>
                            <div className="hidden md:flex items-center ms-3 relative">
                                { user ? (
                                <NavDropdown 
                                name={user.name} 
                                role={user.role}
                                photo={user.profile_photo}
                                type={user.type}
                                />
                                ) : (
                                <div>
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Register
                                    </Link>
                                </div>
                                )}
                            </div>

                            <div className="-me-2 flex items-center md:hidden">
                                <ResponsiveButton
                                    handleClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    showIconClass={showingNavigationDropdown ? 'hidden' : 'inline-flex'}
                                    closeIconClass={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0') + ' md:hidden fixed right-0 min-w-[250px] h-screen mt-20 bg-white dark:bg-slate-800 bg-opacity-90 backdrop-blur-sm transition duration-700 ease-in-out'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    {user ? (
                    <div className="pt-4 pb-1 border-t border-gray-300 dark:border-gray-600">
                        <ResponsiveUserInformation
                            username={user.name}
                            email={user.email}
                            photo={user.profile_photo}
                        />

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            { user.role === 1 && (
                            <ResponsiveNavLink href={route('admin.dashboard')}>Admin Panel</ResponsiveNavLink>
                            )}
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                    ):(
                        <div className="pt-4 pb-1 border-t border-gray-300 dark:border-gray-600">
                            <ResponsiveNavLink href={route('login')}>
                                Log in
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('register')}>
                                Register
                            </ResponsiveNavLink>
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header>
                    <div>{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
