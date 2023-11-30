export default function ResponsiveBusinessInformation({ className = '', bname, bemail, bphoto }) {
    return (
        <div className={'flex px-4 ' + className }>
            <div className="flex-shrink-0 mr-3">
                <img
                    src={bphoto ? ('/storage/profile-photos/' + bphoto) : ('/storage/profile-photos/business-default.png')}
                    alt={bname}
                    className="h-10 w-10 rounded-md border-2 bg-slate-200"
                />
            </div>
            <div>
                <div className="font-medium text-base text-gray-800 dark:text-white">{bname}</div>
                <div className="font-medium text-sm text-gray-500 dark:text-gray-400">{bemail}</div>
            </div>
        </div>
    )
}