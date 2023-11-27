import Footer from '@/Layouts/Partials/Footer';
import LandingLayout from '@/Layouts/LandingLayout';
import { Head, Link } from '@inertiajs/react';

export default function DashboardAdmin({ auth }) {
    return (
        <LandingLayout
            user={auth.user}
            header={(
                <div className='md:flex md:justify-between max-w-7xl w-full px-8 pt-20'>
                    <div className='self-center space-y-6 text-white'>
                        <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight">
                            GreenCycle for<br />Everyone
                        </h1>
                        <p className='text-2xl'>Turning Waste into a Greener Tomorrow!</p>
                    </div>
                    <img src={'/images/home1.svg'} className="md:w-1/2 mt-10 md:mt-4" />
                </div>
                )}
        >
            <Head title="GreenCycle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className='text-3xl text-center my-8 font-semibold text-gray-800 dark:text-white'>The latest from GreenCycle</h2>
                    <div className=' w-1/12 h-1 bg-emerald-600 mx-auto mb-8'></div>
                    <div className='flex flex-wrap justify-around gap-4'>
                        
                        <div className="sm:w-[45%] md:w-[30%] mx-3 sm:mx-0 bg-white dark:bg-slate-700 overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div>
                                <img src={'/images/card1.jpg'} className='w-full'/>
                            </div>
                            <div className="px-6 space-y-5 text-gray-800">
                                <h2 className='text-2xl font-medium mt-5'>Waste Management</h2>
                                <div className='w-24 h-1 bg-emerald-600'></div>
                                <p className='text-lg'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                                <Link href={'/waste-management'} className='font-semibold'>
                                    <div className='w-fit px-3 py-2 my-5 border-2 border-emerald-600 hover:bg-emerald-100'>
                                        Read more
                                    </div>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="sm:w-[45%] md:w-[30%] mx-3 sm:mx-0 bg-white dark:bg-slate-700 overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div>
                                <img src={'/images/card1.jpg'} className='w-full'/>
                            </div>
                            <div className="px-6 space-y-5 text-gray-800">
                                <h2 className='text-2xl font-medium mt-5'>Waste Management</h2>
                                <div className='w-24 h-1 bg-emerald-600'></div>
                                <p className='text-lg'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                                <Link href={'/waste-management'} className='font-semibold'>
                                    <div className='w-fit px-3 py-2 my-5 border-2 border-emerald-600 hover:bg-emerald-100'>
                                        Read more
                                    </div>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="sm:w-[45%] md:w-[30%] mx-3 sm:mx-0 bg-white dark:bg-slate-700 overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div>
                                <img src={'/images/card1.jpg'} className='w-full'/>
                            </div>
                            <div className="px-6 space-y-5 text-gray-800">
                                <h2 className='text-2xl font-medium mt-5'>Waste Management</h2>
                                <div className='w-24 h-1 bg-emerald-600'></div>
                                <p className='text-lg'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                                <Link href={'/waste-management'} className='font-semibold'>
                                    <div className='w-fit px-3 py-2 my-5 border-2 border-emerald-600 hover:bg-emerald-100'>
                                        Read more
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="pt-6 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className='text-3xl text-left my-4 font-semibold text-gray-800 dark:text-white'>Services</h2>
                    <p className='text-xl text-gray-700 dark:text-gray-200 mb-4'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                    </p>
                    <div className='w-1/12 h-1 bg-emerald-600 mb-8'></div>
                    <div className='flex flex-wrap justify-evenly gap-3 sm:gap-4 md:gap-0'>
                        
                        <div className="w-2/3 sm:w-[43%] md:w-[23%] h-72 mx-3 sm:mx-0 bg-white overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div className="p-6 space-y-4 text-gray-800">
                                <h2 className='text-2xl font-medium'>Pick Up</h2>
                                <div className='w-full h-1 bg-emerald-600'></div>
                                <p className='text-lg'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                        
                        <div className="w-2/3 sm:w-[43%] md:w-[23%] h-72 mx-3 sm:mx-0 bg-white overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div className="p-6 space-y-4 text-gray-800">
                                <h2 className='text-2xl font-medium'>Pick Up</h2>
                                <div className='w-full h-1 bg-emerald-600'></div>
                                <p className='text-lg'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                        
                        <div className="w-2/3 sm:w-[43%] md:w-[23%] h-72 mx-3 sm:mx-0 bg-white overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div className="p-6 space-y-4 text-gray-800">
                                <h2 className='text-2xl font-medium'>Pick Up</h2>
                                <div className='w-full h-1 bg-emerald-600'></div>
                                <p className='text-lg'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                        
                        <div className="w-2/3 sm:w-[43%] md:w-[23%] h-72 mx-3 sm:mx-0 bg-white overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <div className="p-6 space-y-4 text-gray-800">
                                <h2 className='text-2xl font-medium'>Pick Up</h2>
                                <div className='w-full h-1 bg-emerald-600'></div>
                                <p className='text-lg'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>

            

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Type of Waste | Popular Items</div>
                    </div>
                </div>
            </div>

            <Footer />
        </LandingLayout>
    );
}
