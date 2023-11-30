import { useState } from 'react';
import AdminSideBar from './Partials/AdminSideBar';
import ResponsiveButton from '@/Components/ResponsiveButton';
import DarkModeToggle from '@/Components/DarkModeToggle';
import NavDropdown from '@/Components/NavDropdown';

export default function AdminPanel({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className='flex relative'>
        
        <AdminSideBar 
            className={(showingNavigationDropdown ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0')}
            handleClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
            username={user.name}
            email={user.email}
            photo={user.profile_photo}
        />

        <div className="min-h-screen w-full md:ms-[270px] bg-slate-200 dark:bg-slate-900 relative overflow-hidden transition duration-500 ease-in-out">
            <nav className="bg-white border-b border-gray-100 dark:bg-slate-800 dark:border-slate-700 transition duration-500 ease-in-out">
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

                        <div className="flex md:items-center md:ms-6">
                            <DarkModeToggle className='self-center mt-1 mx-2' />
                            <div className="hidden md:flex items-center ms-3 relative">
                                <NavDropdown
                                name={user.name} 
                                role={user.role}
                                photo={user.profile_photo}
                                type={user.type}
                                />
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
