import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import { Fragment, useEffect, useState } from "react";
import FormModal from "@/Components/FormModal";
import OrderPanelNav from "./Partials/OrderPanelNav";
import NoDataFoundIcon from "@/Components/NoDataFoundIcon";

export default function WaitList({ auth }) {
    const pickupWaitList = usePage().props.auth.pickupWaitList;
    // console.log(pickupWaitList);

    const sortedPickupWaitList = pickupWaitList.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

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

    const calculateTotalApproxEarn = (order) => {
        const pickupItems = order.pickupitem;
        // console.log(pickupItems);
        return pickupItems.reduce(
            (total, item) => total + (item.approx_earn || 0),
            0
        );
    };

    const [showCancel, setShowCancel] = useState(false);
    const [showDeatils, setShowDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [provinceNames, setProvinceNames] = useState({});
    const [regencyNames, setRegencyNames] = useState({});
    const [districtNames, setDistrictNames] = useState({});
    const apiKey = import.meta.env.VITE_BINDERBYTE_API_KEY;
    const { patch } = useForm();

    useEffect(() => {
        const fetchProvinceNames = async () => {
            const provinceNamesMap = {};

            for (const pickup of pickupWaitList) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`
                    );
                    const responseData = await response.json();
                    const provinceData = responseData.value.find(
                        (province) => province.id === pickup.location.province
                    );
                    const provinceName = provinceData
                        ? provinceData.name
                        : "Unknown";
                    provinceNamesMap[pickup.id] = provinceName;
                } catch (error) {
                    console.error(
                        `Error fetching province for pickup with ID ${pickup.id}: ${error.message}`
                    );
                }
            }
            setProvinceNames(provinceNamesMap);
        };

        fetchProvinceNames();
    }, [pickupWaitList, apiKey]);

    useEffect(() => {
        const fetchRegencyNames = async () => {
            const regencyNamesMap = {};

            for (const pickup of pickupWaitList) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${pickup.location.province}`
                    );
                    const responseData = await response.json();
                    const regencyData = responseData.value.find(
                        (regency) => regency.id === pickup.location.regency
                    );
                    const regencyName = regencyData
                        ? regencyData.name
                        : "Unknown";
                    regencyNamesMap[pickup.id] = regencyName;
                } catch (error) {
                    console.error(
                        `Error fetching regency for pickup with ID ${pickup.id}: ${error.message}`
                    );
                }
            }
            setRegencyNames(regencyNamesMap);
        };

        fetchRegencyNames();
    }, [pickupWaitList, apiKey]);

    useEffect(() => {
        const fetchDistrictNames = async () => {
            const districtNamesMap = {};

            for (const pickup of pickupWaitList) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${pickup.location.regency}`
                    );
                    const responseData = await response.json();
                    const districtData = responseData.value.find(
                        (district) => district.id === pickup.location.district
                    );
                    const districtName = districtData
                        ? districtData.name
                        : "Unknown";
                    districtNamesMap[pickup.id] = districtName;
                } catch (error) {
                    console.error(
                        `Error fetching district for pickup with ID ${pickup.id}: ${error.message}`
                    );
                }
            }
            setDistrictNames(districtNamesMap);
        };

        fetchDistrictNames();
    }, [pickupWaitList, apiKey]);

    const openDetails = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };
    const closeDetails = () => {
        setSelectedOrder(null);
        setShowDetails(false);
    };
    const openCancel = (order) => {
        setSelectedOrder(order);
        setShowCancel(true);
    };
    const closeCancel = () => {
        setSelectedOrder(null);
        setShowCancel(false);
    };

    const submit = (e) => {
        e.preventDefault();
        // console.log(selectedOrder);
        patch(route("order.waitlist.cancel", { id: selectedOrder.id }), {
            onSuccess: () => closeCancel(),
        });
    };

    return (
        <LandingLayout
            user={auth.user}
            header={
                <div className="relative flex justify-center items-center bg-emerald-600">
                    <div className="max-w-7xl w-full pt-20 flex justify-center z-10">
                        <OrderPanelNav />
                    </div>
                </div>
            }
        >
            <Head title="My Orders" />
            <section className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center">
                    <div className="bg-white dark:bg-slate-700 w-full md:w-5/6 lg:w-2/3 text-gray-800 dark:text-gray-200">
                        <div className="p-8 space-y-6">
                            {sortedPickupWaitList.map((order) => (
                                <div
                                    key={order.id}
                                    className="border-2 border-slate-500"
                                >
                                    <div className="grid grid-cols-5 border-b-2 border-slate-500 p-4">
                                        <div className="col-span-3 self-center">
                                            <h3 className="uppercase font-bold text-lg">
                                                Order ID : P - {order.id}
                                            </h3>
                                            <p className="text-sm">
                                                Order Date:{" "}
                                                {formatDateTime(
                                                    order.created_at
                                                )}
                                            </p>
                                        </div>
                                        <div className="col-span-2 flex flex-col justify-between items-end">
                                            <p className="text-sm italic">
                                                {order.status == 1 && "Pending"}
                                                {order.status == 3 &&
                                                    "Accepted"}
                                            </p>
                                            <div className="text-end">
                                                <span className="text-sm">
                                                    Approx. earn
                                                </span>
                                                <p className="text-lg font-bold">
                                                    {formatCurrency(
                                                        calculateTotalApproxEarn(
                                                            order
                                                        )
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-end gap-2">
                                        <button
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                                            type="button"
                                            onClick={() => openDetails(order)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            onClick={() => openCancel(order)}
                                            disabled={order.status == 3}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {sortedPickupWaitList.length == 0 && (
                                <div className="flex flex-col justify-center py-12 items-center font-bold text-lg">
                                    <NoDataFoundIcon className="w-80 h-80" />
                                    <p className="pt-4">
                                        No order found.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

            <FormModal
                title="Order Details"
                show={showDeatils}
                onClose={closeDetails}
                hideFooter={true}
            >
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

            <ConfirmationModal
                show={showCancel}
                onClose={closeCancel}
                title="Cancel Order"
                content="Are you sure you want to cancel this order?"
                onSubmit={submit}
            />
        </LandingLayout>
    );
}
