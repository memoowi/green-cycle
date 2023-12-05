import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Dropzone from "@/Components/Dropzone";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ArrowBreadcrumbs from "@/Components/ArrowBreadcrumbs";

export default function CreateItem({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        price: "",
        item_image: "",
    });

    const submit = (e) => {
        e.preventDefault();

        // console.log(data);
        post(route("admin.items.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminPanelLayout
            user={auth.user}
            header={
                <h2 className="inline-flex items-center font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight select-none">
                    <Link href={route("admin.items")} className="hover:underline">Items</Link>
                    <ArrowBreadcrumbs />
                    <Link href={route("admin.items.create")} className="hover:underline">New Item</Link>
                </h2>
            }
        >
            <Head title="New Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            <p className="text-2xl font-bold uppercase mb-4 dark:text-gray-100">
                                Create New Item
                            </p>
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12">
                                        <Dropzone
                                            id="item_image"
                                            required={true}
                                            onChange={(e) => setData("item_image", e.target.files[0])}
                                        />
                                        <InputError
                                            message={errors.item_image}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                        />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="mt-1 w-full"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <InputLabel
                                            htmlFor="price"
                                            value="Price (/kg)"
                                        />
                                        <TextInput
                                            id="price"
                                            name="price"
                                            type="number"
                                            className="mt-1 w-full"
                                            value={data.price}
                                            onChange={(e) => setData("price", e.target.value)}
                                        />
                                        <InputError
                                            message={errors.price}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <PrimaryButton
                                            className="mt-4"
                                            disabled={processing}
                                        >
                                            Add
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanelLayout>
    );
}
