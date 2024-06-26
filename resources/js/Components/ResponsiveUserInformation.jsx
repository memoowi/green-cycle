import { Link, usePage } from "@inertiajs/react";

export default function ResponsiveUserInformation({ className = '', username, email, photo }) {
    const user = usePage().props.auth.user;
    return (
        <Link href={route('user.profile',{user: user.id})} className={'flex px-4 ' + className }>
            <div className="flex-shrink-0 mr-3">
                <img
                    src={photo ? ('/storage/profile-photos/' + photo) : ('/storage/profile-photos/default.jpg')}
                    alt={username}
                    className="h-10 w-10 rounded-full border-2 object-cover"
                />
            </div>
            <div>
                <div className="font-medium text-base text-gray-800 dark:text-white">{username}</div>
                <div className="font-medium text-sm text-gray-500 dark:text-gray-400">{email}</div>
            </div>
        </Link>
    )
}