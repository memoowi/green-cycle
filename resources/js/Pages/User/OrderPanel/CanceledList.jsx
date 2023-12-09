import Footer from "@/Layouts/Partials/Footer";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";
import FormModal from "@/Components/FormModal";
import OrderPanelNav from "./Partials/OrderPanelNav";
import NoDataFoundIcon from "@/Components/NoDataFoundIcon";

export default function CanceledList({ auth }) {
    const pickupCanceledList = usePage().props.auth.pickupCanceledList;
    // console.log(pickupCanceledList);

    const sortedpickupCanceledList = pickupCanceledList.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
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

    const [showDeatils, setShowDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [provinceNames, setProvinceNames] = useState({});
    const [regencyNames, setRegencyNames] = useState({});
    const [districtNames, setDistrictNames] = useState({});
    const apiKey = import.meta.env.VITE_BINDERBYTE_API_KEY;

    useEffect(() => {
        const fetchProvinceNames = async () => {
            const provinceNamesMap = {};

            for (const pickup of pickupCanceledList) {
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
    }, [pickupCanceledList, apiKey]);

    useEffect(() => {
        const fetchRegencyNames = async () => {
            const regencyNamesMap = {};

            for (const pickup of pickupCanceledList) {
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
    }, [pickupCanceledList, apiKey]);

    useEffect(() => {
        const fetchDistrictNames = async () => {
            const districtNamesMap = {};

            for (const pickup of pickupCanceledList) {
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
    }, [pickupCanceledList, apiKey]);

    const openDetails = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };
    const closeDetails = () => {
        setSelectedOrder(null);
        setShowDetails(false);
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
                            {sortedpickupCanceledList.map((order) => (
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
                                                {order.status == 2 &&
                                                    "Canceled"}
                                                {order.status == 4 &&
                                                    "Declined"}
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
                                    </div>
                                </div>
                            ))}
                            {sortedpickupCanceledList.length == 0 && (
                                <div className="flex flex-col justify-center py-12 items-center font-bold text-lg">
                                    <NoDataFoundIcon className="w-80 h-80" />
                                    <p className="pt-4">
                                        No canceled / declined orders yet
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
                {selectedOrder
                    ? selectedOrder.status == 4 && (
                          <div className="col-span-12 flex justify-between dark:text-white border-2 border-slate-500 p-3">
                              <h5 className="font-bold">Declined By : </h5>
                              <p className="text-sm">
                                  <Link
                                      href={route("business.public.profile", {
                                          business: selectedOrder
                                              ? selectedOrder.business.id
                                              : "Loading",
                                      })}
                                      className="hover:text-emerald-600 hover:underline"
                                  >
                                      {selectedOrder
                                          ? selectedOrder.business.business_name
                                          : "Loading"}
                                  </Link>
                              </p>
                          </div>
                      )
                    : null}
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
        </LandingLayout>
    );
}
