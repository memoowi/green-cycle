import ApplicationLogo from '@/Components/ApplicationLogo';
import DarkModeToggle from '@/Components/DarkModeToggle';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-stone-300 dark:bg-slate-800 relative">
            <DarkModeToggle 
                className='absolute top-5 right-5'
            />
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-700 dark:text-emerald-500" />
                </Link>
            </div>

            <div className='mt-4'>
                <h1 className='text-3xl font-bold text-black dark:text-emerald-500'>
                    {route().current('login') && 'Login'}
                    {route().current('register') && 'Register'}
                    {route().current('password.request') && 'Forgot Password'}
                    {route().current('business.create') && 'Register New Business'}
                </h1>
            </div>

            <div className="w-full max-w-md mt-6 px-6 py-4 bg-white dark:bg-slate-300 border-2 border-black dark:border-gray-500 overflow-hidden rounded-2xl shadow-[-10px_10px_0_0_rgb(0,0,0)] dark:shadow-[-10px_10px_0_0_rgb(5,150,105)]">
                {children}
            </div>
        </div>
    );
}
