import { FaTrashAlt } from "react-icons/fa";
import { useFormik } from "formik";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function InvoiceItem({
  id,
  invoiceItems,
  setInvoiceItems,
  itemsArray,
  setItemsArray,
}) {
  const [inputDisabled, setInputDisabled] = useState(false);

  const deleteInvoiceItem = (indexToDelete) => {
    const newArr = invoiceItems.filter((item) => {
      return indexToDelete !== item;
    });
    setInvoiceItems(newArr);
    const newUpdateItemsArray = itemsArray.filter((item, index) => {
      return item.id !== indexToDelete;
    });
    setItemsArray(newUpdateItemsArray);
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      id: null,
      itemName: "",
      itemQty: "",
      itemPrice: "",
      itemTotal: "",
    },
  });

  //const itemQuantity = parseInt(formik.values.itemQty
  const confirmInvoiceItemDetails = (e) => {
    e.preventDefault();

    const invoiceItemDetails = {
      id: uuidv4(),
      name: formik.values.itemName,
      quantity: formik.values.itemQty,
      price: formik.values.itemPrice,
    };
    (invoiceItemDetails.total =
      formik.values.itemQty * formik.values.itemPrice > 0
        ? parseFloat(formik.values.itemQty) *
          parseFloat(formik.values.itemPrice)
        : 0),
      setItemsArray([...itemsArray, invoiceItemDetails]);

    setInputDisabled(true);
  };

  return (
    <div className="flex flex-col justify-between border-b-2 border-b-slate-100 pb-3 mt-6">
      <div className="flex  justify-between gap-6">
        <div className="flex flex-col basis-3/5">
          <label className="text-black dark:text-white">Item Name</label>
          <input
            onChange={formik.handleChange}
            name="itemName"
            className={` outline-none rounded-lg p-2 bg-[#f8f8fb] dark:bg-[#1e2139]  text-black dark:text-white dark:border-0 border border-gray-300`}
            disabled={inputDisabled}
          ></input>
        </div>

        <div className="flex flex-col basis-2/5">
          <label className="self-end text-black dark:text-white">Qty.</label>
          <input
            onChange={formik.handleChange}
            name="itemQty"
            placeholder="1"
            type="number"
            className=" rounded-lg p-2 w-2/4 self-end outline-none bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300 text-right"
            disabled={inputDisabled}
          ></input>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col sm:basis-2/5">
          <label className="text-black dark:text-white ">Price</label>
          <input
            onChange={formik.handleChange}
            name="itemPrice"
            placeholder="0"
            type="number"
            className="outline-none rounded-lg p-2 w-3/4 bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300"
            disabled={inputDisabled}
          ></input>
        </div>

        <div className="flex flex-col sm:basis-3/5">
          <label className="sm:self-end text-black dark:text-white">
            Total
          </label>
          <input
            name="itemTotal"
            disabled
            placeholder="0"
            className="outline-none rounded-lg p-2  bg-[#f8f8fb] dark:bg-[#1e2139] text-black dark:text-white dark:border-0 border border-gray-300 overflow-hidden sm:w-2/4 sm:self-end text-right"
            value={
              formik.values.itemQty * formik.values.itemPrice > 0
                ? formik.values.itemQty * formik.values.itemPrice
                : 0
            }
          ></input>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex flex-col items-center justify-end">
          <button
            className="bg-green-600 p-2 rounded-lg  dark:text-white "
            onClick={confirmInvoiceItemDetails}
          >
            Confirm
          </button>
        </div>

        {/* trash icon */}
        <div className="flex items-end pb-2">
          <FaTrashAlt
            onClick={() => deleteInvoiceItem(id)}
            size={"1.3rem"}
            color={"gray"}
          />
        </div>
      </div>
    </div>
  );
}

export default InvoiceItem;
