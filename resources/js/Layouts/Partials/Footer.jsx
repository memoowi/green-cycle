import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className='bg-slate-700 text-white'>
            <div className="sm:flex flex-wrap justify-around space-y-6 sm:space-y-0 md:justify-between max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className='space-y-4'>
                    <div className='flex items-center gap-4'>
                        <ApplicationLogo className="h-9 w-auto fill-current" />
                        <p className='text-2xl font-bold'>GreenCycle</p>
                    </div>
                    <p className="text-sm">© 2023 GreenCycle. All rights reserved.<br/> Made by <a href="https://www.instagram.com/me_moowi/" className='hover:underline hover:text-emerald-500' target='_blank'>Misbach</a></p>
                </div>
                <div className='space-y-4'>
                    <p className='font-bold'>GreenCycle</p>
                    <ul className='space-y-2'>
                        <li>
                            <Link href={route('about-us')} className='hover:underline hover:text-emerald-500'>About Us</Link>
                        </li>
                        <li>
                            <Link href="/#services" className='hover:underline hover:text-emerald-500'>Services</Link>
                        </li>
                        <li>
                            <Link href="#" className='hover:underline hover:text-emerald-500'>Blog</Link>
                        </li>
                        <li>
                            <Link href={route('how-it-works')} className='hover:underline hover:text-emerald-500'>How it Works</Link>
                        </li>
                    </ul>
                </div>
                <div className='space-y-4'>
                    <p className='font-bold'>Information</p>
                    <ul className='space-y-2'>
                        <li>
                            <Link href="#" className='hover:underline hover:text-emerald-500'>Contact Us</Link>
                        </li>
                        <li>
                            <Link href="#" className='hover:underline hover:text-emerald-500'>FAQs</Link>
                        </li>
                        <li>
                            <Link href="#" className='hover:underline hover:text-emerald-500'>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="#" className='hover:underline hover:text-emerald-500'>Terms and Conditions</Link>
                        </li>
                    </ul>
                </div>
                <div className='space-y-4 sm:pt-6 md:pt-0'>
                    <p className='font-bold'>Follow Us</p>
                    <p className='text-sm text-gray-300'>For the latest recycling news and tips</p>
                    <ul className='flex gap-4'>
                        <li>
                            <a href="https://www.facebook.com/" target="_blank">
                                <div className='p-2 rounded bg-blue-500 hover:shadow-[-5px_5px_0_0_rgba(255,255,255,1)] dark:hover:shadow-[-5px_5px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition duration-200 ease-in-out'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/me_moowi/" target="_blank">
                                <div className='p-2 rounded bg-fuchsia-600 hover:shadow-[-5px_5px_0_0_rgba(255,255,255,1)] dark:hover:shadow-[-5px_5px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition duration-200 ease-in-out'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/" target="_blank">
                                <div className='p-2 rounded bg-gray-800 hover:shadow-[-5px_5px_0_0_rgba(255,255,255,1)] dark:hover:shadow-[-5px_5px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition duration-200 ease-in-out'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="2 2 28 28" fill="currentColor">
                                        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/" target="_blank">
                                <div className='p-2 rounded bg-red-500 hover:shadow-[-5px_5px_0_0_rgba(255,255,255,1)] dark:hover:shadow-[-5px_5px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition duration-200 ease-in-out'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                    </svg>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}