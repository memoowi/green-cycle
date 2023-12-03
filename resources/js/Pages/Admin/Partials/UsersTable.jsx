import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
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
    const [showModalRemove, setShowModalRemove] = useState(false);
    const [showModalBan, setShowModalBan] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            role: "",
            type: "",
            profile_photo: "",
            bio: "",
            website_link: "",
            social_link1: "",
            social_link2: "",
            social_link3: "",
            social_link4: "",
            total_earned: "",
            is_ban: "",
        });

    useEffect(() => {
        if (selectedUser) {
            setData({
                ...selectedUser,
            });
            Object.keys(errors).forEach((key) => {
                errors[key] = null;
            });
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

    const openModalRemove = (user) => {
        setSelectedUser(user);
        setShowModalRemove(true);
    };

    const closeModalRemove = () => {
        setSelectedUser(null);
        setShowModalRemove(false);
    };

    const openModalBan = (user) => {
        setSelectedUser(user);
        setShowModalBan(true);
    };

    const closeModalBan = () => {
        setSelectedUser(null);
        setShowModalBan(false);
    };

    const submit = (e) => {
        e.preventDefault();

        // console.log(data);
        patch(route("admin.users.update", selectedUser.id));
    };

    const submitRemovePhoto = (e) => {
        e.preventDefault();

        // console.log(data);
        patch(route("admin.users.removephoto", selectedUser.id), {
            onSuccess: () => closeModalRemove(),
        });
    };

    const submitBan = (e) => {
        e.preventDefault();

        // console.log(data);
        patch(route("admin.users.ban", selectedUser.id), {
            onSuccess: () => closeModalBan(),
        });
    };

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex items-center justify-between ms-1 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4">
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
                            <td className="px-6 py-4 flex flex-row gap-1">
                                {/* Modal toggle */}
                                <button
                                    onClick={() => openModal(user)}
                                    className="text-white bg-emerald-600 hover:bg-emerald-700 font-medium rounded-lg text-sm p-3 text-center"
                                    type="button"
                                >
                                    <svg
                                        className="w-4 h-4 stroke-current stroke-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => openModalRemove(user)}
                                    className="text-white bg-yellow-600 hover:bg-yellow-700 font-medium rounded-lg text-sm p-3 text-center"
                                    type="button"
                                >
                                    <svg
                                        className="w-5 h-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 512"
                                    >
                                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => openModalBan(user)}
                                    className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm p-3 text-center"
                                    type="button"
                                >
                                    <svg
                                        className="w-4 h-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                                    </svg>
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
                <div className="relative max-h-full">
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
                    <form
                        onSubmit={submit}
                        className="relative bg-white  shadow dark:bg-gray-700 w-full"
                    >
                        {/* Modal header */}
                        {/* Modal body */}
                        <div className="p-6 space-y-6 w-[92vw] sm:w-full max-h-[600px] overflow-y-auto">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 sm:col-span-6">
                                    <InputLabel
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        value="Name"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
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
                                        type="email"
                                        className="w-full"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
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
                                        type="text"
                                        className="w-full"
                                        value={data.role}
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.role}
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
                                        type="text"
                                        className="w-full"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.type}
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
                                        type="url"
                                        className="w-full"
                                        value={data.website_link || ""}
                                        onChange={(e) =>
                                            setData(
                                                "website_link",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.website_link}
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
                                        type="url"
                                        className="w-full"
                                        value={data.social_link1 || ""}
                                        onChange={(e) =>
                                            setData(
                                                "social_link1",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.social_link1}
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
                                        type="url"
                                        className="w-full"
                                        value={data.social_link2 || ""}
                                        onChange={(e) =>
                                            setData(
                                                "social_link2",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.social_link2}
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
                                        type="url"
                                        className="w-full"
                                        value={data.social_link3 || ""}
                                        onChange={(e) =>
                                            setData(
                                                "social_link3",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.social_link3}
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
                                        type="url"
                                        className="w-full"
                                        value={data.social_link4 || ""}
                                        onChange={(e) =>
                                            setData(
                                                "social_link4",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.social_link4}
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
                                        type="number"
                                        className="w-full"
                                        value={data.total_earned}
                                        onChange={(e) =>
                                            setData(
                                                "total_earned",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.total_earned}
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
                                        type="text"
                                        className="w-full"
                                        value={data.bio || ""}
                                        onChange={(e) =>
                                            setData("bio", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.bio}
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
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </Modal>
            {/* Remove Profile Modal */}
            <Modal
                show={showModalRemove}
                onClose={closeModalRemove}
                maxWidth="sm"
            >
                <div className="max-h-full w-[92vw] sm:w-full bg-white dark:bg-gray-700">
                    {/* Modal content */}
                    <div className="flex items-start justify-between p-4 border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Remove Profile Photo
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeModalRemove}
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
                    <div className="flex justify-center p-5">
                        <svg
                            className="w-24 h-24 text-yellow-500 dark:text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </div>
                    <p className="text-center text-lg text-gray-600 dark:text-gray-300">
                        Are you sure ?
                    </p>
                    <div className="flex p-6 justify-center gap-4">
                        <form onSubmit={submitRemovePhoto}>
                            <button className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-xl px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">
                                Yes
                            </button>
                        </form>
                        <button
                            onClick={closeModalRemove}
                            className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-xl px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            {/* Toggle Ban Modal */}
            <Modal
                show={showModalBan}
                onClose={closeModalBan}
                maxWidth="sm"
            >
                <div className="max-h-full w-[92vw] sm:w-full bg-white dark:bg-gray-700">
                    {/* Modal content */}
                    <div className="flex items-start justify-between p-4 border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {data.is_ban ? "Unban User" : "Ban User"}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeModalBan}
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
                    <div className="flex justify-center p-5">
                        <svg
                            className="w-24 h-24 text-yellow-500 dark:text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </div>
                    <p className="text-center text-lg text-gray-600 dark:text-gray-300">
                        Are you sure ?
                    </p>
                    <div className="flex p-6 justify-center gap-4">
                        <form onSubmit={submitBan}>
                            <button className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-xl px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">
                                Yes
                            </button>
                        </form>
                        <button
                            onClick={closeModalBan}
                            className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-xl px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
