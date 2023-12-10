import ConfirmationModal from "@/Components/ConfirmationModal";
import FormModal from "@/Components/FormModal";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NoDataFoundIcon from "@/Components/NoDataFoundIcon";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TakenOrderLists() {
    const takenOrders = usePage().props.auth.takenOrders;
    // const business = usePage().props.auth.business;
    // console.log(takenOrders);
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
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    };

    const calculateTotalApproxEarn = (takenOrder) => {
        const pickupItems = takenOrder.pickupitem;
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

            for (const takenOrder of takenOrders) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`
                    );
                    const responseData = await response.json();
                    const provinceData = responseData.value.find(
                        (province) =>
                            province.id === takenOrder.location.province
                    );
                    const provinceName = provinceData
                        ? provinceData.name
                        : "Unknown";
                    provinceNamesMap[takenOrder.id] = provinceName;
                } catch (error) {
                    console.error(
                        `Error fetching province for takenOrder with ID ${takenOrder.id}: ${error.message}`
                    );
                }
            }
            setProvinceNames(provinceNamesMap);
        };

        fetchProvinceNames();
    }, [takenOrders, apiKey]);

    useEffect(() => {
        const fetchRegencyNames = async () => {
            const regencyNamesMap = {};

            for (const takenOrder of takenOrders) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${takenOrder.location.province}`
                    );
                    const responseData = await response.json();
                    const regencyData = responseData.value.find(
                        (regency) => regency.id === takenOrder.location.regency
                    );
                    const regencyName = regencyData
                        ? regencyData.name
                        : "Unknown";
                    regencyNamesMap[takenOrder.id] = regencyName;
                } catch (error) {
                    console.error(
                        `Error fetching regency for takenOrder with ID ${takenOrder.id}: ${error.message}`
                    );
                }
            }
            setRegencyNames(regencyNamesMap);
        };

        fetchRegencyNames();
    }, [takenOrders, apiKey]);

    useEffect(() => {
        const fetchDistrictNames = async () => {
            const districtNamesMap = {};

            for (const takenOrder of takenOrders) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${takenOrder.location.regency}`
                    );
                    const responseData = await response.json();
                    const districtData = responseData.value.find(
                        (district) =>
                            district.id === takenOrder.location.district
                    );
                    const districtName = districtData
                        ? districtData.name
                        : "Unknown";
                    districtNamesMap[takenOrder.id] = districtName;
                } catch (error) {
                    console.error(
                        `Error fetching district for takenOrder with ID ${takenOrder.id}: ${error.message}`
                    );
                }
            }
            setDistrictNames(districtNamesMap);
        };

        fetchDistrictNames();
    }, [takenOrders, apiKey]);

    const openDetails = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };
    const closeDetails = () => {
        setSelectedOrder(null);
        setShowDetails(false);
    };

    return (
        <div>
            <div className="space-y-5">
                {takenOrders.map((takenOrder) => (
                    <div
                        key={takenOrder.id}
                        className="border-2 border-gray-300"
                    >
                        <div className="grid grid-cols-12 p-4">
                            <div className="col-span-6 self-center">
                                <h3 className="uppercase text-lg font-bold">
                                    Order ID : P - {takenOrder.id}
                                </h3>
                                <p className="text-sm">
                                    Order By : {takenOrder.user.name}
                                </p>
                                <p className="text-sm">
                                    Order Date :{" "}
                                    {formatDateTime(takenOrder.created_at)}
                                </p>
                                {takenOrder.status == 6 && (
                                    <p className="text-sm">
                                        Completed Date :{" "}
                                        {formatDate(takenOrder.completed_at)}
                                    </p>
                                )}
                            </div>
                            <div className="col-span-6 self-center text-end">
                                <p className="text-sm italic font-bold">
                                    Status :
                                    <span className={takenOrder.status == 6 ? "text-green-500" : "text-red-500"}>
                                    {takenOrder.status == 6
                                        ? " Completed"
                                        : " Declined"}
                                    </span>
                                </p>
                                <p className="text-sm uppercase">
                                    {takenOrder.status == 6
                                        ? takenOrder.paymentmethod.type
                                        : " - "}
                                </p>
                                <p className="text-lg font-bold">
                                    <span className="text-sm">Paid : </span>
                                    {formatCurrency(takenOrder.amount_paid)}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end border-t-2 border-gray-300 p-3 gap-3">
                            <button
                                onClick={() => openDetails(takenOrder)}
                                className="border-2 border-gray-700 dark:border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white font-bold py-2 px-4 rounded"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
                {takenOrders.length == 0 && (
                    <div className="w-full h-full p-20 flex flex-col items-center justify-center gap-5">
                        <NoDataFoundIcon className="w-80 h-80" />
                        <h1 className="text-2xl font-bold">
                            You haven't taken any order
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
                    <h5 className="font-bold">Completed Date : </h5>
                    <p className="text-sm">
                        {formatDateTime(
                            selectedOrder
                                ? selectedOrder.completed_at
                                : "Loading"
                        )}
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
                    <h5 className="font-bold">Photo : </h5>
                    <div className="text-sm">
                        {selectedOrder ? (
                            <img
                                src={
                                    "/storage/pick-up-photos/" +
                                    selectedOrder.photo
                                }
                                alt={selectedOrder.photo}
                                className="w-full mx-auto border-2 object-cover object-center rounded-lg overflow-hidden"
                            />
                        ) : (
                            "Loading"
                        )}
                    </div>
                </div>
                {selectedOrder
                    ? selectedOrder.status == 6 && (
                          <div className="col-span-6 space-y-2 dark:text-white">
                              <h5 className="font-bold">Invoice Photo : </h5>
                              <div className="text-sm">
                                  <img
                                      src={
                                          "/storage/order-invoices/" +
                                          selectedOrder.invoice_photo
                                      }
                                      alt={selectedOrder.invoice_photo}
                                      className="w-full mx-auto border-2 object-cover object-center rounded-lg overflow-hidden"
                                  />
                              </div>
                          </div>
                      )
                    : "Loading"}
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
                <div className="col-span-12 space-y-2 pb-4 text-end dark:text-white border-b-2 border-slate-500">
                    <h5 className="font-bold inline me-10">
                        First Approx. Total :{" "}
                    </h5>
                    <p className="text-sm inline">
                        {selectedOrder
                            ? formatCurrency(
                                  calculateTotalApproxEarn(selectedOrder)
                              )
                            : "Loading"}
                    </p>
                </div>
                <div className="col-span-12 text-end dark:text-white">
                    <h5 className="font-bold inline me-10"> Paid : </h5>
                    <p className="text-sm inline">
                        {selectedOrder
                            ? formatCurrency(selectedOrder.amount_paid)
                            : "Loading"}
                    </p>
                </div>
            </FormModal>
        </div>
    );
}
