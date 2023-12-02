import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function UsersTable() {
    const users = usePage().props.auth.users;

    // Sort based on date created
    const sortedUsers = users.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    // Search state
    const [searchTerm, setSearchTerm] = useState("");

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Filter and paginate the users array based on the search term
    const filteredUsers = sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: '',
        date_of_birth: '',
        email: '',
        role: '',
        type: '',
        profile_photo: '',
        bio: '',
        website_link: '',
        social_link1: '',
        social_link2: '',
        social_link3: '',
        social_link4: '',
        total_earned: '',
        is_ban: '',
    });

    useEffect(() => {
        if (selectedUser) {
            setData({
                name: selectedUser.name,
                date_of_birth: selectedUser.date_of_birth,
                email: selectedUser.email,
                role: selectedUser.role,
                type: selectedUser.type,
                profile_photo: selectedUser.profile_photo,
                bio: selectedUser.bio,
                website_link: selectedUser.website_link,
                social_link1: selectedUser.social_link1,
                social_link2: selectedUser.social_link2,
                social_link3: selectedUser.social_link3,
                social_link4: selectedUser.social_link4,
                total_earned: selectedUser.total_earned,
                is_ban: selectedUser.is_ban,
            })
        }
    }, [selectedUser]);

    const openModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    const submit = (e) => {
        e.preventDefault();
        
        console.log(selectedUser);

        if (selectedUser) {
            patch(route('admin.users.update', selectedUser.id), {
                onSuccess: () => closeModal(),
            });
        }
    }

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex items-center justify-between ms-1 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users"
                        value={searchTerm || ""}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Account Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((user) => (
                        <tr
                            key={user.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <th
                                scope="row"
                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                <img
                                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-slate-600"
                                    src={
                                        user.profile_photo
                                            ? "/storage/profile-photos/" +
                                              user.profile_photo
                                            : "/storage/profile-photos/default.jpg"
                                    }
                                    alt={user.name}
                                />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">
                                        {user.name}
                                    </div>
                                    <div className="font-normal text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                {user.role ? "Admin" : "User"}
                            </td>
                            <td className="px-6 py-4">
                                {user.type ? "Business" : "Basic"}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div
                                        className={
                                            "h-2.5 w-2.5 rounded-full me-2 " +
                                            (user.is_ban
                                                ? "bg-red-500"
                                                : "bg-green-500")
                                        }
                                    ></div>
                                    {user.is_ban ? "Banned" : "Active"}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {/* Modal toggle */}
                                <button
                                    onClick={() => openModal(user)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Control */}
            <div className="flex items-center justify-end mt-4 text-gray-500 dark:text-gray-400 select-none">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pl-5 pr-3 py-1  border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:disabled:bg-gray-700 rounded-s-full mr-2"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {Math.ceil(users.length / pageSize)}
                </span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={endIndex >= users.length}
                    className="pl-3 pr-5 py-1  border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:disabled:bg-gray-700 rounded-e-full ml-2"
                >
                    Next
                </button>
            </div>

            {/* Edit user modal */}
            <Modal show={showModal} onClose={closeModal}>
                <div className="relative w-full sm:min-w-fit max-h-full">
                    {/* Modal content */}
                    <div className="flex items-start justify-between p-4 border-b bg-white dark:bg-gray-700 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit user 
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                            onClick={closeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={submit} className="relative bg-white  shadow dark:bg-gray-700 w-full">
                    {/* Modal header */}
                        {/* Modal body */}
                        <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Name"
                                    />
                                    <TextInput
                                        id="name" 
                                        type='text'
                                        className='w-full'
                                        value={data.name} 
                                        onChange={(e) => setData("name", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Email"
                                    />
                                    <TextInput
                                        id="email" 
                                        type='email'
                                        className='w-full'
                                        value={data.email} 
                                        onChange={(e) => setData("email", e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Role"
                                    />
                                    <TextInput
                                        id="role" 
                                        type='text'
                                        className='w-full'
                                        value={data.role} 
                                        onChange={(e) => setData("role", e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="type"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Type"
                                    />
                                    <TextInput
                                        id="type" 
                                        type='text'
                                        className='w-full'
                                        value={data.type} 
                                        onChange={(e) => setData("type", e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="profile_photo"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Profile Photo"
                                    />
                                    <TextInput
                                        id="profile_photo" 
                                        type='file'
                                        className='w-full'
                                        accept="image/*"
                                        // value={data.profile_photo} 
                                        onChange={(e) => setData("profile_photo", e.target.value)}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="bio"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Bio"
                                    />
                                    <TextInput
                                        id="bio" 
                                        type='text'
                                        className='w-full'
                                        value={data.bio || ""} 
                                        onChange={(e) => setData("bio", e.target.value)}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="website_link"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Website Link"
                                    />
                                    <TextInput
                                        id="website_link" 
                                        type='url'
                                        className='w-full'
                                        value={data.website_link || ""} 
                                        onChange={(e) => setData("website_link", e.target.value)}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="social_link1"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Social Link 1"
                                    />
                                    <TextInput
                                        id="social_link1" 
                                        type='url'
                                        className='w-full'
                                        value={data.social_link1 || ""} 
                                        onChange={(e) => setData("social_link1", e.target.value)}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="social_link2"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Social Link 2"
                                    />
                                    <TextInput
                                        id="social_link2" 
                                        type='url'
                                        className='w-full'
                                        value={data.social_link2 || ""} 
                                        onChange={(e) => setData("social_link2", e.target.value)}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="social_link3"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Social Link 3"
                                    />
                                    <TextInput
                                        id="social_link3" 
                                        type='url'
                                        className='w-full'
                                        value={data.social_link3 || ""} 
                                        onChange={(e) => setData("social_link3", e.target.value)}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="social_link4"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Social Link 4"
                                    />
                                    <TextInput
                                        id="social_link4" 
                                        type='url'
                                        className='w-full'
                                        value={data.social_link4 || ""} 
                                        onChange={(e) => setData("social_link4", e.target.value)}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="total_earned"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Total Earned"
                                    />
                                    <TextInput
                                        id="total_earned" 
                                        type='number'
                                        className='w-full'
                                        value={data.total_earned} 
                                        onChange={(e) => setData("total_earned", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                            <PrimaryButton
                                disabled={processing}
                                onClick={submit}
                            >
                                Save All
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
