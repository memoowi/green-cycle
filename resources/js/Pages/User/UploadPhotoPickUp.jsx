import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import NextButton from "@/Components/NextButton";
import Dropzone from "@/Components/Dropzone";
import InputError from "@/Components/InputError";

export default function UploadPhotoPickUp({ auth }) {
    const pickUpId = usePage().props.pickUpId;
    // console.log(pickUpId);

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        post(route("user.pick-up.uploading-photo", { pickUpId: pickUpId }));
    };
    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center py-16 bg-emerald-600">
                    <div className="max-w-7xl w-full px-8 pt-20 flex justify-center z-10">
                        <div className="bg-white dark:bg-slate-700 p-8 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                            <form onSubmit={ submit } className="grid grid-cols-3">
                                <div className="col-span-2">
                                    <h2 className="text-2xl font-bold uppercase tracking-wide">
                                        Upload Photo
                                    </h2>
                                    <div className="w-3/12 h-1 bg-emerald-600 my-4"></div>
                                </div>
                                <div className="col-span-1 flex justify-end w-full h-fit">
                                    <NextButton disabled={processing}>Next</NextButton>
                                </div>
                                <div className="col-span-3 mt-4">
                                    <Dropzone 
                                        id={'photo'}
                                        required={true}
                                        onChange={(e) => setData('photo', e.target.files[0])}
                                    />
                                    <InputError message={errors.photo} className="mt-2" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className=" w-72 h-72 absolute bottom-20 right-20 rounded-full border-[15px] border-double border-emerald-500 animate-[ping_3s_linear_infinite]"></div>
                    <div className=" w-60 h-60 absolute top-10 left-20 rounded-full border-[15px] border-double border-emerald-500 animate-[ping_4s_linear_infinite]"></div>
                    <div className=" w-56 h-56 absolute bottom-20 left-20 rounded-full border-[15px] border-double border-emerald-500 animate-[ping_6s_linear_infinite]"></div>
                    <div className=" w-36 h-36 absolute top-20 right-20 rounded-full border-[15px] border-double border-emerald-500 animate-[ping_5s_linear_infinite]"></div>
                </div>
            }
        >
            <Head title="Pick Up" />

            <Footer />
        </LandingLayout>
    );
}
