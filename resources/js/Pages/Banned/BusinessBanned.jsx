import SadIcon from "@/Components/SadIcon";
import BusinessPanelLayout from "@/Layouts/BusinessPanelLayout";
import { Head } from "@inertiajs/react";

export default function BusinessBanned({ auth }) {
    return (
        <BusinessPanelLayout
            user={auth.user}
            business={auth.business}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Banned
                </h2>
            }
        >
            <Head title="Banned" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-red-200 p-12 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-semibold text-2xl text-red-800 leading-tight text-center">
                                You're Recycling Facility is banned
                            </h3>
                            <SadIcon className="w-80 h-80 mx-auto -mt-16" />
                            <p className="text-center -mt-12">
                                If you believe that this ban is unjust or if
                                there's been a misunderstanding, we encourage
                                you to contact us as soon as possible. Our
                                dedicated support team is here to assist you and
                                address any concerns you may have. We value your
                                partnership and are committed to resolving this
                                issue promptly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </BusinessPanelLayout>
    );
}
