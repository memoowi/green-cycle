import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import DarkModeToggle from '@/Components/DarkModeToggle';
import ResponsiveButton from '@/Components/ResponsiveButton';

export default function Landing({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
            <nav className="flex justify-center w-full fixed bg-white bg-opacity-90 backdrop-blur-sm">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-white" />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden space-x-6 md:-my-px sm:ms-10 md:flex">
                            <NavLink href='/'>
                                Home
                            </NavLink>
                            <NavLink href='/'>
                                Recycle an Item
                            </NavLink>
                            <NavLink href='/'>
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
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        { user.role === 1 && (
                                        <Dropdown.Link href={route('admin.dashboard')}>Admin Panel</Dropdown.Link>
                                        )}
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                                ) : (
                                <div>
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
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

                <div className={(showingNavigationDropdown ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0') + ' md:hidden fixed right-0 min-w-[70%] h-full mt-20 bg-blue-400 bg-opacity-25 backdrop-blur-sm transition duration-700 ease-in-out'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    {user ? (
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user && user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user && user.email}</div>
                        </div>

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
                        <div>
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
                <header className="bg-emerald-600 shadow">
                    <div className="flex justify-center items-center h-[90vh] md:h-screen">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
