import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

export default function SwitchAccountType({ className = '' }) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Switch Account Type</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account type.
                </p>
            </header>

            <form className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="type" value="Switch Account Type" />
                    <select
                        id="type"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        // value={data.email}
                        // onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="type"
                    >
                        <option value="0">Basic</option>
                        <option value="1">Bussiness</option>
                    </select>

                    <InputError 
                    className="mt-2" 
                    // message={errors.email} 
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton 
                    // disabled={processing}
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        // show={recentlySuccessful}
                        show={false}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}
