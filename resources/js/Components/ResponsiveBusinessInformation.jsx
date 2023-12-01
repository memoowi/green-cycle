export default function ResponsiveBusinessInformation({ className = '', bname, bemail, bphoto, bstatus }) {
    return (
        <div className={'flex px-4 ' + className }>
            <div className="flex-shrink-0 mr-3 self-center">
                <img
                    src={bphoto ? ('/storage/b-photos/' + bphoto) : ('/storage/b-photos/business-default.png')}
                    alt={bname}
                    className="h-10 w-10 rounded-md border-2 bg-slate-200 object-cover"
                />
            </div>
            <div className="select-none">
                <div className="font-medium text-base text-gray-800 dark:text-white">{bname}</div>
                <div className="font-medium text-sm text-gray-500 dark:text-gray-400">{bemail}</div>
                { bstatus == 0 && 
                    <div className="mt-2 px-2 py-1 text-sm font-bold w-fit text-white bg-red-600 rounded-3xl">Inactive</div>
                }
                { bstatus == 1 && 
                    <div className="mt-2 px-2 py-1 text-sm font-bold w-fit text-white bg-emerald-600 rounded-3xl">Active</div>
                }
            </div>
        </div>
    )
}