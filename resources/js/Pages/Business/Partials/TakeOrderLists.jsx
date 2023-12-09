import FormModal from "@/Components/FormModal";
import { useForm, usePage } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";

export default function TakeOrderLists() {
    const takeOrders = usePage().props.auth.takeOrders;
    // console.log(takeOrders);
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

    const calculateTotalApproxEarn = (takeOrder) => {
        const pickupItems = takeOrder.pickupitem;
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
    const { patch } = useForm();

    useEffect(() => {
        const fetchProvinceNames = async () => {
            const provinceNamesMap = {};

            for (const takeOrder of takeOrders) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`
                    );
                    const responseData = await response.json();
                    const provinceData = responseData.value.find(
                        (province) => province.id === takeOrder.location.province
                    );
                    const provinceName = provinceData
                        ? provinceData.name
                        : "Unknown";
                    provinceNamesMap[takeOrder.id] = provinceName;
                } catch (error) {
                    console.error(
                        `Error fetching province for takeOrder with ID ${takeOrder.id}: ${error.message}`
                    );
                }
            }
            setProvinceNames(provinceNamesMap);
        };

        fetchProvinceNames();
    }, [takeOrders, apiKey]);

    useEffect(() => {
        const fetchRegencyNames = async () => {
            const regencyNamesMap = {};

            for (const takeOrder of takeOrders) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${takeOrder.location.province}`
                    );
                    const responseData = await response.json();
                    const regencyData = responseData.value.find(
                        (regency) => regency.id === takeOrder.location.regency
                    );
                    const regencyName = regencyData
                        ? regencyData.name
                        : "Unknown";
                    regencyNamesMap[takeOrder.id] = regencyName;
                } catch (error) {
                    console.error(
                        `Error fetching regency for takeOrder with ID ${takeOrder.id}: ${error.message}`
                    );
                }
            }
            setRegencyNames(regencyNamesMap);
        };

        fetchRegencyNames();
    }, [takeOrders, apiKey]);

    useEffect(() => {
        const fetchDistrictNames = async () => {
            const districtNamesMap = {};

            for (const takeOrder of takeOrders) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${takeOrder.location.regency}`
                    );
                    const responseData = await response.json();
                    const districtData = responseData.value.find(
                        (district) => district.id === takeOrder.location.district
                    );
                    const districtName = districtData
                        ? districtData.name
                        : "Unknown";
                    districtNamesMap[takeOrder.id] = districtName;
                } catch (error) {
                    console.error(
                        `Error fetching district for takeOrder with ID ${takeOrder.id}: ${error.message}`
                    );
                }
            }
            setDistrictNames(districtNamesMap);
        };

        fetchDistrictNames();
    }, [takeOrders, apiKey]);

    const openDetails = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };
    const closeDetails = () => {
        setSelectedOrder(null);
        setShowDetails(false);
    };

    const submit = (e) => {
        e.preventDefault();

        // console.log(selectedOrder);
        patch(route("business.take-order.pick", { order : selectedOrder.id}), {
            onSuccess: () => {
                setSelectedOrder(null);
            },
        });
    };
    return (
        <div>
            <div className="space-y-5">
                {takeOrders.map((takeOrder) => (
                    <div
                        key={takeOrder.id}
                        className="border-2 border-gray-300"
                    >
                        <div className="grid grid-cols-12 p-4">
                            <div className="col-span-6 self-center">
                                <h3 className="uppercase text-lg font-bold">
                                    Order ID : P - {takeOrder.id}
                                </h3>
                                <p className="text-sm">
                                    Order By : {takeOrder.user.name}
                                </p>
                                <p className="text-sm">
                                    Order Date :{" "}
                                    {formatDateTime(takeOrder.created_at)}
                                </p>
                            </div>
                            <div className="col-span-6 self-center text-end">
                                <p className="text-sm italic">
                                    {takeOrder.status == 1 && "Pending"}
                                </p>
                                <p className="text-sm uppercase">
                                    {takeOrder.paymentmethod.type}
                                </p>
                                <p className="text-lg font-bold">
                                    {formatCurrency(
                                        calculateTotalApproxEarn(takeOrder)
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end border-t-2 border-gray-300 p-3 gap-3">
                            <button onClick={() => openDetails(takeOrder)} className="border-2 border-gray-700 dark:border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white font-bold py-2 px-4 rounded">
                                View Detail
                            </button>
                            <form onSubmit={submit} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
                                <button type="submit" onClick={() => setSelectedOrder(takeOrder)}>
                                    Take Order
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
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
        </div>
    );
}
