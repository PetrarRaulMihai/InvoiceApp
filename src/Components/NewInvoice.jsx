import { useEffect, useState } from "react";
import { useFormik } from "formik";
import InvoiceItem from "./InvoiceItem";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";

function NewInvoice({ setFlagToUpdateMainPage }) {
  const [invoiceItems, setInvoiceItems] = useState([1]);
  const [itemsArray, setItemsArray] = useState([]);
  const [setItemsDetailsObj] = useState({});

  const getTotalFromAllItems = itemsArray.reduce((acc, curr) => {
    return acc + curr.total;
  }, 0);

  const formik = useFormik({
    initialValues: {
      createdAt: "",
      paymentDue: "",
      description: "",
      paymentTerms: "",
      clientName: "",
      clientEmail: "",
      status: "",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [{}],
    },

    onSubmit: (values) => {
      // Handle form submission or update your state here.
    },
  });

  useEffect(() => {
    formik.setFieldValue("items", itemsArray);
  }, [itemsArray]);

  const incrementInvoiceItemsArray = (event) => {
    event.preventDefault();
    const newItemId = Date.now(); // this is mandatory for deleting to work properly
    setInvoiceItems([...invoiceItems, newItemId]);
  };

  const originalDate = new Date(formik.values.createdAt);
  const newDate = new Date(
    originalDate.getTime() + formik.values.paymentTerms * 24 * 60 * 60 * 1000
  );

  const createNewInvoiceDetails = async () => {
    const { error } = await supabase.from("InvoiceApp-Invoices").insert({
      createdAt: formik.values.createdAt,
      paymentDue: newDate,
      description: formik.values.description,
      paymentTerms: formik.values.paymentTerms,
      clientName: formik.values.clientName,
      clientEmail: formik.values.clientEmail,
      status: formik.values.status,
      total: getTotalFromAllItems,
      senderAddress: {
        street: formik.values.senderAddress.street,
        city: formik.values.senderAddress.city,
        postCode: formik.values.senderAddress.postCode,
        country: formik.values.senderAddress.country,
      },
      clientAddress: {
        street: formik.values.clientAddress.street,
        city: formik.values.clientAddress.city,
        postCode: formik.values.clientAddress.postCode,
        country: formik.values.clientAddress.country,
      },
      items: [...itemsArray],
    });

    setFlagToUpdateMainPage((prev) => !prev);
  };

  return (
    <div className="  bg-[#f8f8fb] dark:bg-[#141625] flex flex-col text-white px-4 sm:px-16 lg:px-40 xl:px-48 2xl:px-80">
      <div className="basis-1/6 ">
        <p className="text-2xl font-bold py-10 text-black dark:text-white">
          Create Invoice
        </p>
      </div>

      {/* form for invoice details */}
      <div className="basis-4/6 bg-[#f8f8fb]  dark:bg-[#141625] overflow-auto pl-1">
        {/* bill from */}
        <form className="flex flex-col" onSubmit={formik.values.handleSubmit}>
          <div>
            <p className="dark:text-white text-[#7c5df9] font-bold">
              Bill From
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-black dark:text-white">Street Address</label>
            <input
              onChange={formik.handleChange}
              name="senderAddress.street"
              value={formik.values.senderAddress.street}
              type="text"
              className="rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300"
            ></input>
          </div>

          <div className="flex gap-6 md:justify-between">
            <div className=" flex flex-col">
              <label className="text-black dark:text-white">City</label>
              <input
                onChange={formik.handleChange}
                name="senderAddress.city"
                value={formik.values.senderAddress.city}
                className="w-full rounded-lg p-2  bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label className="text-black dark:text-white">Post Code</label>
              <input
                onChange={formik.handleChange}
                name="senderAddress.postCode"
                value={formik.values.senderAddress.postCode}
                className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label className="text-black dark:text-white">Country</label>
              <input
                onChange={formik.handleChange}
                name="senderAddress.country"
                value={formik.values.senderAddress.country}
                className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300"
              ></input>
            </div>
          </div>

          {/* bill to */}
          <div className="py-6">
            <p className="dark:text-white text-[#7c5df9] font-bold">Bill To</p>
          </div>
          <div className="flex flex-col">
            <div className="lg:flex lg:justify-between">
              <div className="flex flex-col">
                <label className="text-black dark:text-white">
                  Client Name
                </label>
                <input
                  onChange={formik.handleChange}
                  name="clientName"
                  values={formik.values.clientName}
                  type="text"
                  className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300 lg:w-[20rem]"
                ></input>
              </div>

              <div className=" flex flex-col">
                <label className="text-black dark:text-white">
                  Client Email
                </label>
                <input
                  onChange={formik.handleChange}
                  name="clientEmail"
                  values={formik.values.clientEmail}
                  type="email"
                  className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300 lg:w-[20rem]"
                ></input>
              </div>
            </div>

            <div className=" flex flex-col">
              <p className="text-black dark:text-white">Client Address</p>
              <label className="text-black dark:text-white">Street</label>
              <input
                onChange={formik.handleChange}
                type="text"
                name="clientAddress.street"
                values={formik.values.clientAddress.street}
                className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300"
              ></input>
            </div>

            <div className="flex gap-6 md:justify-between">
              <div className=" flex flex-col">
                <label className="text-black dark:text-white">City</label>
                <input
                  onChange={formik.handleChange}
                  name="clientAddress.city"
                  value={formik.values.clientAddress.city}
                  className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300"
                ></input>
              </div>

              <div className=" flex flex-col">
                <label className="text-black dark:text-white">Post Code</label>
                <input
                  onChange={formik.handleChange}
                  name="clientAddress.postCode"
                  value={formik.values.clientAddress.postCode}
                  className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300"
                ></input>
              </div>

              <div className=" flex flex-col">
                <label className="text-black dark:text-white">Country</label>
                <input
                  onChange={formik.handleChange}
                  name="clientAddress.country"
                  value={formik.values.clientAddress.country}
                  className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300"
                ></input>
              </div>
            </div>

            {/*dates */}
            <div className="flex flex-col mt-10 xl:flex-row justify-between">
              {/* container for invoice date and payment terms */}
              <div className="flex gap-6 sm:justify-between xl:gap-12">
                <div className="lg:flex lg:flex-col">
                  <label className="text-black dark:text-white">
                    Invoice Date
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.createdAt}
                    name="createdAt"
                    type="date"
                    className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300 lg:w-[20rem] xl:w-[12rem]"
                    placeholder="mm/dd/yyyy"
                  ></input>
                </div>
                <div className="lg:flex lg:flex-col">
                  <label htmlFor="terms" className="text-black dark:text-white">
                    Payment Terms
                  </label>
                  <select
                    onChange={formik.handleChange}
                    className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300 border-b-[3px]  lg:w-[20rem] xl:w-[12rem]"
                    name="paymentTerms"
                    value={formik.values.paymentTerms}
                  >
                    <option value="">Select day</option>
                    <option value="1">Next day</option>
                    <option value="7">Next 7 days</option>
                    <option value="14">Next 14 days</option>
                    <option value="30">Next 30 days</option>
                  </select>
                </div>
              </div>
              {/* description container */}
              <div className="lg:flex lg:justify-between xl:gap-12">
                <div className="lg:flex lg:flex-col">
                  <label className="text-black dark:text-white">
                    Description
                  </label>
                  <input
                    onChange={formik.handleChange}
                    name="description"
                    values={formik.values.description}
                    className="w-full rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139] dark:border-0 border border-gray-300 text-black dark:text-white lg:w-[20rem] xl:w-[12rem]"
                    type="text"
                  ></input>
                </div>
                {/* Status of inveoice select */}
                <div className="lg:flex lg:flex-col">
                  <label
                    htmlFor="status"
                    className="text-black dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    onChange={formik.handleChange}
                    className="w-full rounded-lg p-2 text-black dark:text-white bg-[#f8f8fb] dark:bg-[#1e2139] dark:border-0 border border-gray-300 border-b-[3px]  lg:w-[20rem] xl:w-[12rem]"
                    name="status"
                    value={formik.values.status}
                  >
                    <option value="">Select status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Item list container */}
            <div>
              <div className="mt-4">
                <p className=" sm:text-lg sm:font-bold text-black dark:text-white">
                  Item List
                </p>
              </div>

              {/* potential component down */}

              {/* item name + quantity container */}
              {invoiceItems.map((invoiceItem, index) => {
                return (
                  <InvoiceItem
                    id={invoiceItem}
                    key={invoiceItem} // this is mandatory for deleting to work properly
                    invoiceItems={invoiceItems}
                    setInvoiceItems={setInvoiceItems}
                    itemsArray={itemsArray}
                    setItemsArray={setItemsArray}
                    setItemsDetailsObj={setItemsDetailsObj}
                  />
                );
              })}
              {/* potential component up */}
            </div>
            <div className="text-center rounded-lg bg-black py-2 mt-6">
              <button onClick={incrementInvoiceItemsArray} className=" ">
                + Add new Item
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* save and discard buttons */}
      <div className="flex justify-between py-8">
        <Link to={"/home"}>
          <button className=" bg-[#1e2139] p-2 rounded-full">Discard</button>
        </Link>

        <Link to={"/home"}>
          <button
            onClick={() => {
              createNewInvoiceDetails();
            }}
            className="bg-[#7c5dfa] p-2 rounded-full"
          >
            Save & Send
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NewInvoice;
