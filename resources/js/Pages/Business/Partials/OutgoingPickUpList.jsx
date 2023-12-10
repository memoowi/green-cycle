import ConfirmationModal from "@/Components/ConfirmationModal";
import FormModal from "@/Components/FormModal";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NoDataFoundIcon from "@/Components/NoDataFoundIcon";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OutgoingPickUpList() {
    const outgoingPickups = usePage().props.auth.outgoingPickups;
    // const business = usePage().props.auth.business;
    // console.log(outgoingPickups);
    const formatDateTime = (dateTimeString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        };
        return new Date(dateTimeString).toLocaleDateString("en-US", options);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    };

    const calculateTotalApproxEarn = (outgoingPickup) => {
        const pickupItems = outgoingPickup.pickupitem;
        // console.log(pickupItems);
        return pickupItems.reduce(
            (total, item) => total + (item.approx_earn || 0),
            0
        );
    };

    const [showDeatils, setShowDetails] = useState(false);
    const [showDecline, setShowDecline] = useState(false);
    const [showComplete, setShowComplete] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [provinceNames, setProvinceNames] = useState({});
    const [regencyNames, setRegencyNames] = useState({});
    const [districtNames, setDistrictNames] = useState({});
    const apiKey = import.meta.env.VITE_BINDERBYTE_API_KEY;
    const {
        data,
        setData,
        post,
        patch,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        amount_paid: selectedOrder ? selectedOrder.amount_paid : 0,
    });

    useEffect(() => {
        const fetchProvinceNames = async () => {
            const provinceNamesMap = {};

            for (const outgoingPickup of outgoingPickups) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`
                    );
                    const responseData = await response.json();
                    const provinceData = responseData.value.find(
                        (province) =>
                            province.id === outgoingPickup.location.province
                    );
                    const provinceName = provinceData
                        ? provinceData.name
                        : "Unknown";
                    provinceNamesMap[outgoingPickup.id] = provinceName;
                } catch (error) {
                    console.error(
                        `Error fetching province for outgoingPickup with ID ${outgoingPickup.id}: ${error.message}`
                    );
                }
            }
            setProvinceNames(provinceNamesMap);
        };

        fetchProvinceNames();
    }, [outgoingPickups, apiKey]);

    useEffect(() => {
        const fetchRegencyNames = async () => {
            const regencyNamesMap = {};

            for (const outgoingPickup of outgoingPickups) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${outgoingPickup.location.province}`
                    );
                    const responseData = await response.json();
                    const regencyData = responseData.value.find(
                        (regency) =>
                            regency.id === outgoingPickup.location.regency
                    );
                    const regencyName = regencyData
                        ? regencyData.name
                        : "Unknown";
                    regencyNamesMap[outgoingPickup.id] = regencyName;
                } catch (error) {
                    console.error(
                        `Error fetching regency for outgoingPickup with ID ${outgoingPickup.id}: ${error.message}`
                    );
                }
            }
            setRegencyNames(regencyNamesMap);
        };

        fetchRegencyNames();
    }, [outgoingPickups, apiKey]);

    useEffect(() => {
        const fetchDistrictNames = async () => {
            const districtNamesMap = {};

            for (const outgoingPickup of outgoingPickups) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${outgoingPickup.location.regency}`
                    );
                    const responseData = await response.json();
                    const districtData = responseData.value.find(
                        (district) =>
                            district.id === outgoingPickup.location.district
                    );
                    const districtName = districtData
                        ? districtData.name
                        : "Unknown";
                    districtNamesMap[outgoingPickup.id] = districtName;
                } catch (error) {
                    console.error(
                        `Error fetching district for outgoingPickup with ID ${outgoingPickup.id}: ${error.message}`
                    );
                }
            }
            setDistrictNames(districtNamesMap);
        };

        fetchDistrictNames();
    }, [outgoingPickups, apiKey]);

    const openDetails = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };
    const closeDetails = () => {
        setSelectedOrder(null);
        setShowDetails(false);
    };

    const openDecline = (order) => {
        setSelectedOrder(order);
        setShowDecline(true);
    };
    const closeDecline = () => {
        setSelectedOrder(null);
        setShowDecline(false);
    };

    const openComplete = (order) => {
        setSelectedOrder(order);
        setShowComplete(true);
    };
    const closeComplete = () => {
        setSelectedOrder(null);
        setShowComplete(false);
        Object.keys(errors).forEach((key) => {
            errors[key] = null;
        });
    };

    const submitDecline = (e) => {
        e.preventDefault();

        // console.log(selectedOrder);
        patch(
            route("business.outgoing-pickup.decline", {
                order: selectedOrder.id,
            }),
            {
                onSuccess: () => {
                    closeDecline();
                    toast.success("Order declined successfully");
                },
            }
        );
    };
    const submitOTW = (e) => {
        e.preventDefault();

        // console.log(selectedOrder);
        patch(
            route("business.outgoing-pickup.otw", { order: selectedOrder.id }),
            {
                onSuccess: () => {
                    setSelectedOrder(null);
                    toast.success("Order OTW successfully");
                },
            }
        );
    };
    const submitComplete = (e) => {
        e.preventDefault();

        // console.log(data);
        post(route("business.outgoing-pickup.complete", { order : selectedOrder.id }), {
            onSuccess: () => {
                closeComplete();
                toast.success("Order completed!");
            },
        });
    };
    return (
        <div>
            <div className="space-y-5">
                {outgoingPickups.map((outgoingPickup) => (
                    <div
                        key={outgoingPickup.id}
                        className="border-2 border-gray-300"
                    >
                        <div className="grid grid-cols-12 p-4">
                            <div className="col-span-6 self-center">
                                <h3 className="uppercase text-lg font-bold">
                                    Order ID : P - {outgoingPickup.id}
                                </h3>
                                <p className="text-sm">
                                    Order By : {outgoingPickup.user.name}
                                </p>
                                <p className="text-sm">
                                    Order Date :{" "}
                                    {formatDateTime(outgoingPickup.created_at)}
                                </p>
                            </div>
                            <div className="col-span-6 self-center text-end">
                                <p className="text-sm italic">
                                    Status :
                                    {outgoingPickup.status == 3
                                        ? " Accepted"
                                        : " On The Way"}
                                </p>
                                <p className="text-sm uppercase">
                                    {outgoingPickup.paymentmethod.type}
                                </p>
                                <p className="text-lg font-bold">
                                    {formatCurrency(
                                        calculateTotalApproxEarn(outgoingPickup)
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end border-t-2 border-gray-300 p-3 gap-3">
                            <button
                                onClick={() => openDecline(outgoingPickup)}
                                title="Decline Order"
                                className="text-white font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-700"
                            >
                                <div className="flex gap-2">
                                    <svg
                                        className="w-6 h-6 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                    >
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                    </svg>

                                    <span>Decline</span>
                                </div>
                            </button>
                            <button
                                onClick={() => openDetails(outgoingPickup)}
                                className="border-2 border-gray-700 dark:border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white font-bold py-2 px-4 rounded"
                            >
                                View Detail
                            </button>
                            <form
                                onSubmit={submitOTW}
                                className={
                                    "text-white font-bold py-2 px-4 rounded bg-cyan-600 hover:bg-cyan-700" +
                                    (outgoingPickup.status == 3
                                        ? ""
                                        : " hidden")
                                }
                            >
                                <button
                                    type="submit"
                                    onClick={() =>
                                        setSelectedOrder(outgoingPickup)
                                    }
                                    title="change status"
                                    className="h-full w-full"
                                >
                                    <div className="flex gap-2">
                                        <svg
                                            className="w-5 h-4 fill-current self-center"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 512"
                                        >
                                            <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                                        </svg>
                                        <span>On The Way</span>
                                    </div>
                                </button>
                            </form>
                            <button
                                type="submit"
                                onClick={() => openComplete(outgoingPickup)}
                                title="Complete Order"
                                className={
                                    "text-white font-bold py-2 px-4 rounded bg-emerald-600 hover:bg-emerald-700 " +
                                    (outgoingPickup.status == 3 ? "hidden" : "")
                                }
                            >
                                <div className="flex gap-2">
                                    <svg
                                        className="w-4 h-4 fill-current self-center"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                                    </svg>
                                    <span>Complete</span>
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
                {outgoingPickups.length == 0 && (
                    <div className="w-full h-full p-20 flex flex-col items-center justify-center gap-5">
                        <NoDataFoundIcon className="w-80 h-80" />
                        <h1 className="text-2xl font-bold">
                            You haven't take any order
                        </h1>
                    </div>
                )}
            </div>
            <FormModal
                title="Order Details"
                show={showDeatils}
                onClose={closeDetails}
                hideFooter={true}
            >
                <div className="col-span-12 flex justify-between space-y-2 dark:text-white">
                    <div className="space-y-2">
                        <h5 className="font-bold">Order By : </h5>
                        <p className="text-sm">
                            {selectedOrder
                                ? selectedOrder.user.name
                                : "Loading"}
                        </p>
                    </div>
                    <div className="self-center">
                        <Link
                            href={route("user.profile", {
                                user: selectedOrder
                                    ? selectedOrder.user.id
                                    : "Loading",
                            })}
                            className="border-2 border-gray-700 dark:border-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded"
                        >
                            Show Profile
                        </Link>
                    </div>
                </div>
                <div className="col-span-6 space-y-2 dark:text-white">
                    <h5 className="font-bold">Order ID : </h5>
                    <p className="text-sm">
                        P - {selectedOrder ? selectedOrder.id : "Loading"}
                    </p>
                </div>
                <div className="col-span-6 space-y-2 dark:text-white">
                    <h5 className="font-bold">Order Date : </h5>
                    <p className="text-sm">
                        {formatDateTime(
                            selectedOrder ? selectedOrder.created_at : "Loading"
                        )}
                    </p>
                </div>
                <div className="col-span-6 space-y-2 dark:text-white">
                    <h5 className="font-bold">Address : </h5>
                    <p className="text-sm">
                        {selectedOrder
                            ? selectedOrder.location.address +
                              ", " +
                              districtNames[selectedOrder.id] +
                              ", " +
                              regencyNames[selectedOrder.id] +
                              ", " +
                              provinceNames[selectedOrder.id] +
                              ", " +
                              selectedOrder.location.postal_code
                            : "Loading"}
                    </p>
                </div>
                <div className="col-span-6 space-y-2 dark:text-white">
                    <h5 className="font-bold">Phone Number : </h5>
                    <p className="text-sm">
                        {selectedOrder
                            ? selectedOrder.location.phone_number
                            : "Loading"}
                    </p>
                </div>
                <div className="col-span-12 space-y-2 dark:text-white">
                    <h5 className="font-bold">Photo : </h5>
                    <div className="text-sm">
                        {selectedOrder ? (
                            <img
                                src={
                                    "/storage/pick-up-photos/" +
                                    selectedOrder.photo
                                }
                                alt={selectedOrder.photo}
                                className="w-1/3 mx-auto border-2 object-cover object-center rounded-lg overflow-hidden"
                            />
                        ) : (
                            "Loading"
                        )}
                    </div>
                </div>
                <div className="col-span-12 border-t-2 border-slate-500 space-y-2 dark:text-white">
                    <h5 className="font-bold mt-3">Payment Method : </h5>
                    <div className="text-sm grid grid-cols-12 items-center">
                        <div className="col-span-12 flex justify-between">
                            <span className="font-bold mb-1">
                                Preffered Payment :
                            </span>
                            <span className="uppercase">
                                {selectedOrder
                                    ? selectedOrder.paymentmethod.type
                                    : "Loading"}
                            </span>
                        </div>
                        {selectedOrder
                            ? selectedOrder.paymentmethod.type !== "cash" && (
                                  <Fragment>
                                      <div className="col-span-12 flex justify-between">
                                          <span className="font-bold mb-1">
                                              Bank / Account :{" "}
                                          </span>
                                          <span className="uppercase">
                                              {
                                                  selectedOrder.paymentmethod
                                                      .account_name
                                              }
                                          </span>
                                      </div>

                                      <div className="col-span-12 flex justify-between">
                                          <span className="font-bold mb-1">
                                              Account Number :{" "}
                                          </span>
                                          {
                                              selectedOrder.paymentmethod
                                                  .account_number
                                          }
                                      </div>
                                  </Fragment>
                              )
                            : "Loading"}
                    </div>
                </div>
                <div className="col-span-12 border-t-2 border-slate-500 space-y-2 dark:text-white">
                    <h5 className="font-bold mt-3">Pickup Items : </h5>
                    {selectedOrder
                        ? selectedOrder.pickupitem.map((item, index) => (
                              <div
                                  className="text-sm grid grid-cols-12 items-center"
                                  key={item.id}
                              >
                                  <div className="col-span-1">{index + 1}.</div>
                                  <div className="col-span-5">
                                      {item.item.name}
                                  </div>
                                  <div className="col-span-3 text-end">
                                      x {item.weight} Kg
                                  </div>
                                  <div className="col-span-3 text-end">
                                      {formatCurrency(item.approx_earn)}
                                  </div>
                              </div>
                          ))
                        : "Loading"}
                </div>
                <div className="col-span-12 space-y-2 text-end dark:text-white">
                    <h5 className="font-bold inline me-10">Approx. Total : </h5>
                    <p className="text-sm inline">
                        {selectedOrder
                            ? formatCurrency(
                                  calculateTotalApproxEarn(selectedOrder)
                              )
                            : "Loading"}
                    </p>
                </div>
            </FormModal>

            <FormModal
                title="Fill up to complete"
                show={showComplete}
                onClose={closeComplete}
                onSubmit={submitComplete}
                processing={processing}
                recentlySuccessful={recentlySuccessful}
            >
            <div className="col-span-12 border-t-2 border-slate-500 space-y-2 dark:text-white">
                    <h5 className="font-bold mt-3">Payment Method : </h5>
                    <div className="text-sm grid grid-cols-12 items-center">
                        <div className="col-span-12 flex justify-between">
                            <span className="font-bold mb-1">
                                Preffered Payment :
                            </span>
                            <span className="uppercase">
                                {selectedOrder
                                    ? selectedOrder.paymentmethod.type
                                    : "Loading"}
                            </span>
                        </div>
                        {selectedOrder
                            ? selectedOrder.paymentmethod.type !== "cash" && (
                                  <Fragment>
                                      <div className="col-span-12 flex justify-between">
                                          <span className="font-bold mb-1">
                                              Bank / Account :{" "}
                                          </span>
                                          <span className="uppercase">
                                              {
                                                  selectedOrder.paymentmethod
                                                      .account_name
                                              }
                                          </span>
                                      </div>

                                      <div className="col-span-12 flex justify-between">
                                          <span className="font-bold mb-1">
                                              Account Number :{" "}
                                          </span>
                                          {
                                              selectedOrder.paymentmethod
                                                  .account_number
                                          }
                                      </div>
                                  </Fragment>
                              )
                            : "Loading"}
                    </div>
                </div>
                <div className="col-span-12 border-t-2 border-slate-500 space-y-2 dark:text-white">
                    <h5 className="font-bold mt-3">Pickup Items : </h5>
                    {selectedOrder
                        ? selectedOrder.pickupitem.map((item, index) => (
                              <div
                                  className="text-sm grid grid-cols-12 items-center"
                                  key={item.id}
                              >
                                  <div className="col-span-1">{index + 1}.</div>
                                  <div className="col-span-5">
                                      {item.item.name}
                                  </div>
                                  <div className="col-span-3 text-end">
                                      x {item.weight} Kg
                                  </div>
                                  <div className="col-span-3 text-end">
                                      {formatCurrency(item.approx_earn)}
                                  </div>
                              </div>
                          ))
                        : "Loading"}
                </div>
                <div className="col-span-12 py-2 space-y-2 text-end dark:text-white border-b-2 border-slate-500">
                    <h5 className="font-bold inline me-10">Total : </h5>
                    <p className="text-sm inline">
                        {selectedOrder
                            ? formatCurrency(
                                  calculateTotalApproxEarn(selectedOrder)
                              )
                            : "Loading"}
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <InputLabel htmlFor="amount_paid" value="Amount Paid" />
                    <TextInput
                        id="amount_paid"
                        type="number"
                        name="amount_paid"
                        value={data.amount_paid}
                        className="mt-1 w-full"
                        onChange={(e) => setData("amount_paid", e.target.value)}
                        required
                    />
                    <InputError message={errors.amount_paid} className="mt-2" />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <InputLabel
                        htmlFor="invoice_photo"
                        value="Upload Invoice Photo"
                    />
                    <TextInput
                        id="invoice_photo"
                        type="file"
                        className="w-full mt-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-200 file:text-emerald-900 hover:file:bg-emerald-300 hover:cursor-pointer"
                        onChange={(e) => setData("invoice_photo", e.target.files[0])}
                        required
                    />
                    <InputError
                        message={errors.invoice_photo}
                        className="mt-2"
                    />
                </div>
            </FormModal>

            <ConfirmationModal
                show={showDecline}
                onClose={closeDecline}
                onSubmit={submitDecline}
                title="Decline Order"
                content="Are you sure you want to decline this order?"
            />
        </div>
    );
}
