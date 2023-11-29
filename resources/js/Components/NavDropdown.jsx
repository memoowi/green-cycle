import Dropdown from "./Dropdown";

export default function NavDropdown({name, role, photo}) {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 dark:hover:bg-slate-700 dark:text-gray-300 dark:hover:text-gray-200  focus:outline-none transition ease-in-out duration-150"
                    >
                        <div className="flex items-center me-2 shrink-0">
                            <img 
                                className="h-8 w-8 rounded-full border-2 bg-contain" 
                                src={photo ? ('/storage/profile-photos/' + photo) : ('/storage/profile-photos/default.jpg')} 
                                alt="user" 
                            />
                        </div>
                        {name}

                        <svg
                            className="ms-2 -me-0.5 h-4 w-4 shrink-0"
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
                <Dropdown.Link href={route('location.edit')}>Location</Dropdown.Link>
                <hr className="border-gray-500 dark:border-gray-300 w-10/12 mx-auto my-1"/>
                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                { role === 1 && (
                <Dropdown.Link href={route('admin.dashboard')}>Admin Panel</Dropdown.Link>
                )}
                <Dropdown.Link href={route('logout')} method="post" as="button">
                    Log Out
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    )
}