import BanIconButton from "@/Components/BanIconButton";
import ConfirmationModal from "@/Components/ConfirmationModal";
import EditIconButton from "@/Components/EditIconButton";
import FeaturedTable from "@/Components/FeaturedTable";
import FormModal from "@/Components/FormModal";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TogglesButton from "@/Components/TogglesButton";
import XUserIconButton from "@/Components/XUserIconButton";
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
        <div>
            <FeaturedTable
                placeholderSearch="Search for Users"
                valueInputSearch={searchTerm || ""}
                onChangeSearch={(e) => setSearchTerm(e.target.value)}
                previousClick={() => setCurrentPage(currentPage - 1)}
                disabledPrevious={currentPage === 1}
                nextClick={() => setCurrentPage(currentPage + 1)}
                disabledNext={filteredUsers.length <= pageSize}
                paginationInfo={
                    "Page " +
                    currentPage +
                    " of " +
                    Math.ceil(filteredUsers.length / pageSize)
                }
            >
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
                                <div className="flex items-center gap-1">
                                    <EditIconButton
                                        onClick={() => openModal(user)}
                                        className="text-white bg-emerald-600 hover:bg-emerald-700"
                                        title="Edit User"
                                    />
                                    <XUserIconButton
                                        onClick={() => openModalRemove(user)}
                                        className="text-white bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400"
                                        title="Remove Profile Photo"
                                        disabled={user.profile_photo === null}
                                    />
                                    <BanIconButton
                                        onClick={() => openModalBan(user)}
                                        className={
                                            (user.is_ban ? "-hue-rotate-180" : "") +
                                            " text-white bg-red-600 hover:bg-red-700"
                                        }
                                        title="Ban / Unban User"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {paginatedUsers.length === 0 && (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td colSpan={5} className="px-6 py-4 text-center">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </FeaturedTable>

            {/* Edit user modal */}
            <FormModal
                title='Edit User'
                show={showModal}
                onClose={closeModal}
                onSubmit={submit}
                processing={processing}
                recentlySuccessful={recentlySuccessful}
            >
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
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.name} />
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
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <InputLabel
                        htmlFor="role"
                        className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                        value="Role"
                    />
                    <TogglesButton
                        id="role"
                        className="mb-2 cursor-pointer" 
                        value={data.role}
                        onChange={(e) => setData("role", e.target.checked ? 1 : 0)}
                        checked={data.role == 1 }
                        label={data.role ? 'Admin' : 'User'}
                    />
                    <InputError className="mt-2" message={errors.role} />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <InputLabel
                        htmlFor="type"
                        className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                        value="Type"
                    />
                    <TogglesButton
                        id="type"
                        className="mb-2 cursor-pointer" 
                        value={data.type}
                        onChange={(e) => setData("type", e.target.checked ? 1 : 0)}
                        checked={data.type == 1 }
                        label={data.type ? 'Business' : 'Basic'}
                    />
                    <InputError className="mt-2" message={errors.type} />
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
                            setData("website_link", e.target.value)
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
                            setData("social_link1", e.target.value)
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
                            setData("social_link2", e.target.value)
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
                            setData("social_link3", e.target.value)
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
                            setData("social_link4", e.target.value)
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
                            setData("total_earned", e.target.value)
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
                        onChange={(e) => setData("bio", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.bio} />
                </div>
            </FormModal>

            {/* Remove Profile Modal */}
            <ConfirmationModal
                show={showModalRemove}
                onClose={closeModalRemove}
                title="Remove Profile Photo"
                content={"Are you sure ?"}
                onSubmit={submitRemovePhoto}
            />
            {/* Toggle Ban Modal */}
            <ConfirmationModal
                show={showModalBan}
                onClose={closeModalBan}
                title={data.is_ban ? "Unban User" : "Ban User"}
                content={"Are you sure ?"}
                onSubmit={submitBan}
            />
        </div>
    );
}
