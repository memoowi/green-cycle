import { Link } from "@inertiajs/react";

export default function NewButton({ href, className = "", value }) {
    return (
        <Link href={href}>
            <span className={"group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md" + className }>
                <svg
                    className="fill-current group-hover:animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                { value }
            </span>
        </Link>
    );
}
