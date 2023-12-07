import { Link } from "@inertiajs/react";

export default function CTA({ className = "", children, ...props }) {
    return (
        <Link
            {...props}
            className={"group flex items-center justify-center gap-4 text-white text-3xl py-4 px-6 shadow-[-10px_10px_0px_0px_rgb(0,0,0)] " + className}
        >
            {children}
            <svg
                className="w-6 h-6 shrink-0 opacity-0 -translate-x-10 -me-10 group-hover:opacity-100 group-hover:translate-x-0 group-hover:me-0 transition-all duration-500 ease-in-out"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                />
            </svg>
        </Link>
    );
}
