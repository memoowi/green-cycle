import DetailsIconButton from "@/Components/DetailsIconButton";
import FeaturedTable from "@/Components/FeaturedTable";
import FormModal from "@/Components/FormModal";
import { Link, usePage } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";

export default function ReportsLists() {
    const reportsAdmin = usePage().props.auth.reportsAdmin;
    // console.log(reportsAdmin);

    // sort based on date created
    const sortedreportsAdmin = reportsAdmin.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Search State
    const [searchTerm, setSearchTerm] = useState("");

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Filter and paginate the reportsAdmin array based on the search term
    const filteredreportsAdmin = sortedreportsAdmin.filter((report) =>
        report.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        report.user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (report.business_id && report.business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ) || 
        (report.business_id && report.business.business_email.toLowerCase().includes(searchTerm.toLowerCase()) )
    );
    const paginatedreportsAdmin = filteredreportsAdmin.slice(
        startIndex,
        endIndex
    );

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

    const calculateTotalApproxEarn = (report) => {
        const pickupItems = report.pickupitem;
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

            for (const report of reportsAdmin) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/provinsi?api_key=${apiKey}`
                    );
                    const responseData = await response.json();
                    const provinceData = responseData.value.find(
                        (province) =>
                            province.id === report.location.province
                    );
                    const provinceName = provinceData
                        ? provinceData.name
                        : "Unknown";
                    provinceNamesMap[report.id] = provinceName;
                } catch (error) {
                    console.error(
                        `Error fetching province for report with ID ${report.id}: ${error.message}`
                    );
                }
            }
            setProvinceNames(provinceNamesMap);
        };

        fetchProvinceNames();
    }, [reportsAdmin, apiKey]);

    useEffect(() => {
        const fetchRegencyNames = async () => {
            const regencyNamesMap = {};

            for (const report of reportsAdmin) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${report.location.province}`
                    );
                    const responseData = await response.json();
                    const regencyData = responseData.value.find(
                        (regency) => regency.id === report.location.regency
                    );
                    const regencyName = regencyData
                        ? regencyData.name
                        : "Unknown";
                    regencyNamesMap[report.id] = regencyName;
                } catch (error) {
                    console.error(
                        `Error fetching regency for report with ID ${report.id}: ${error.message}`
                    );
                }
            }
            setRegencyNames(regencyNamesMap);
        };

        fetchRegencyNames();
    }, [reportsAdmin, apiKey]);

    useEffect(() => {
        const fetchDistrictNames = async () => {
            const districtNamesMap = {};

            for (const report of reportsAdmin) {
                try {
                    const response = await fetch(
                        `https://api.binderbyte.com/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${report.location.regency}`
                    );
                    const responseData = await response.json();
                    const districtData = responseData.value.find(
                        (district) =>
                            district.id === report.location.district
                    );
                    const districtName = districtData
                        ? districtData.name
                        : "Unknown";
                    districtNamesMap[report.id] = districtName;
                } catch (error) {
                    console.error(
                        `Error fetching district for report with ID ${report.id}: ${error.message}`
                    );
                }
            }
            setDistrictNames(districtNamesMap);
        };

        fetchDistrictNames();
    }, [reportsAdmin, apiKey]);

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
            <FeaturedTable
                placeholderSearch="Search facilities..."
                valueInputSearch={searchTerm || ""}
                onChangeSearch={(e) => setSearchTerm(e.target.value)}
                previousClick={() => setCurrentPage(currentPage - 1)}
                disabledPrevious={currentPage === 1}
                nextClick={() => setCurrentPage(currentPage + 1)}
                disabledNext={filteredreportsAdmin.length <= pageSize}
                paginationInfo={
                    "Page " +
                    currentPage +
                    " of " +
                    Math.ceil(filteredreportsAdmin.length / pageSize)
                }
            >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            User
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Business
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Order / Completed Date
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
                    {paginatedreportsAdmin.map((report) => (
                        <tr
                            key={report.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div>
                                    <div className="text-base font-semibold">
                                        {report.user.name}
                                    </div>
                                    <div className="font-normal text-gray-500">
                                        {report.user.email}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                <div>
                                    <div className="text-base font-semibold">
                                        {report.business_id ? report.business.business_name : "-"}
                                    </div>
                                    <div className="font-normal text-gray-500">
                                        {report.business_id && report.business.business_email}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                <div>
                                    <div className="text-base font-semibold">
                                        {formatDate(report.created_at)} / {report.completed_at ? formatDate(report.completed_at) : "-"}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div
                                    className={
                                        "px-2.5 py-1 w-fit rounded-xl text-white font-semibold select-none " +
                                        (report.status === 2
                                            ? "bg-yellow-600"
                                            : report.status === 3
                                            ? "bg-sky-600"
                                            : report.status === 4
                                            ? "bg-red-600"
                                            : report.status === 5
                                            ? "bg-cyan-600"
                                            : report.status === 6
                                            ? "bg-emerald-600" : "bg-gray-600")
                                    }
                                >
                                    {report.status === 2
                                        ? "Canceled" : report.status === 3
                                        ? "Acceped" : report.status === 4
                                        ? "Declined" : report.status === 5
                                        ? "OTW" : report.status === 6
                                        ? "Completed" : "Pending"}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1">
                                    <DetailsIconButton
                                        onClick={() => openDetails(report)}
                                        className="text-white bg-teal-600 hover:bg-teal-700"
                                        title="Edit"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {paginatedreportsAdmin.length === 0 && (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td colSpan={5} className="px-6 py-4 text-center">
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </FeaturedTable>
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
                {selectedOrder ? selectedOrder.business_id && (
                    <div className="col-span-12 flex justify-between dark:text-white border-2 border-slate-500 p-3">
                        <h5 className="font-bold">Handled By : </h5>
                        <p className="text-sm">
                            <Link
                                href={route("business.public.profile", {business: selectedOrder ? selectedOrder.business.id : 'Loading',})}
                                className="hover:text-emerald-600 hover:underline"
                            >
                            {selectedOrder ? selectedOrder.business.business_name : "Loading"}
                            </Link>
                        </p>
                    </div>
                    ) : null}
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
                {selectedOrder ? selectedOrder.status == 6 && (
                <div className="col-span-12 text-end dark:text-white">
                    <h5 className="font-bold inline me-10"> Paid : </h5>
                    <p className="text-sm inline">
                        {formatCurrency(selectedOrder.amount_paid)}
                    </p>
                </div>
                ) : "Loading"}
            </FormModal>
        </div>
    );
}
