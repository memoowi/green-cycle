import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import AdminSideBar from './Partials/AdminSideBar';
import ResponsiveButton from '@/Components/ResponsiveButton';

export default function AdminPanel({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className='flex relative'>
        
        <AdminSideBar 
            className={(showingNavigationDropdown ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0')}
            handleClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
            username={user.name}
            email={user.email}
        />

        <div className="min-h-screen w-full bg-gray-100 relative overflow-hidden">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className='flex items-center'>
                            <div className="me-2 flex items-center md:hidden">
                                <ResponsiveButton
                                    handleClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    showIconClass={showingNavigationDropdown ? 'hidden' : 'inline-flex'}
                                    closeIconClass={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                />
                            </div>
                            {header && (
                                <header>
                                    {header}
                                </header>
                            )}
                        </div>
                        <div className="hidden md:flex md:items-center md:ms-6">
                            <div className="ms-3 relative">
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
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
        </div>
    );
}
