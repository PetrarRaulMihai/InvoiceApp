import { useState } from "react";
import { ImPlus } from "react-icons/im";
import Invoice from "../Components/Invoice";
import arrowDown from "../assets/icon-arrow-down.svg";
import { Link } from "react-router-dom";
import "../styles/invoices.css";

import { FcEmptyTrash } from "react-icons/fc";

function Invoices({ invoices }) {
  // filter modal state
  const [filterOpened, setFilterOpened] = useState(false);
  const [statusFiltersArray, setStatusFiltersArray] = useState([]);

  // New item add modal open state

  const filterOpener = () => {
    setFilterOpened((prev) => !prev);
  };

  const addStatus = (event) => {
    if (event.target.checked) {
      setStatusFiltersArray([...statusFiltersArray, event.target.name]);
    } else if (!event.target.checked) {
      const newArr = statusFiltersArray.filter((status) => {
        return status !== event.target.name;
      });
      setStatusFiltersArray(newArr);
    }
  };

  return (
    <div className="h-screen ">
      <div className="bg-[#f8f8fb] dark:bg-[#141625] h-full pt-10 lg:px-72 xl:px-96 2xl:px-[500px]">
        <div className="flex px-4  gap-8 pb-10">
          {/* INVOICES + FILTER */}

          <div className="flex justify-between basis-5/6 text-white font-bold text-sm ">
            <div className="flex flex-col  justify-center">
              <p className="text-lg text-black dark:text-white">Invoices</p>
              <p className="text-black dark:text-white">
                {invoices?.length} items
              </p>
            </div>

            <div className="flex items-center relative">
              <div className="flex gap-3">
                <p className="text-black dark:text-white">Filter</p>

                <div className="flex items-center">
                  <img
                    src={arrowDown}
                    className={`h-2 ${
                      filterOpened
                        ? "-rotate-180 transition-transform duration-300 ease-in-out cursor-pointer"
                        : "transition-transform duration-300 ease-in-out cursor-pointer"
                    }`}
                    onClick={filterOpener}
                  ></img>
                </div>
              </div>

              {/* create filter modal */}
              {filterOpened && (
                <div className="absolute border-2 border-none bg-[#f8f8fb] dark:bg-[#1e2139]  text-white custom-shadow top-16 -left-5 w-36 h-32 z-50 rounded-lg p-4 ">
                  <div className="flex flex-col gap-3 justify-center h-full">
                    <div className="flex items-center">
                      <input
                        onChange={addStatus}
                        type="checkbox"
                        name="paid"
                      ></input>
                      <label
                        for="paid"
                        className="pl-2 text-black dark:text-white"
                      >
                        paid
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        onChange={addStatus}
                        type="checkbox"
                        name="pending"
                      ></input>
                      <label
                        for="pending"
                        className="pl-2 text-black dark:text-white"
                      >
                        pending
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        onChange={addStatus}
                        type="checkbox"
                        name="draft"
                      ></input>
                      <label
                        for="draft"
                        className="pl-2 text-black dark:text-white"
                      >
                        draft
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* INVOICES + FILTER END */}

          {/* NEW */}

          <Link to={"/new-invoice"}>
            <div className="basis-1/6 flex justify-end">
              <div className="bg-[#7c5df9] p-2 flex items-center justify-center  rounded-full">
                <button className="h-9 w-9 text-[#7c5df9] bg-white font-extrabold text-2xl rounded-full flex justify-center items-center">
                  <ImPlus size={"0.9rem"} />
                </button>
                <p className=" text-white font-bold text-base px-2">New</p>
              </div>
            </div>
          </Link>

          {/* NEW END*/}
        </div>

        {!invoices?.length && (
          <div className=" flex flex-col items-center">
            <p className="text-center text-black dark:text-white lg:text-2xl font-semibold pt-10 text-xl">
              No invoices to display
            </p>
            <FcEmptyTrash size={"200px"} />
          </div>
        )}

        <div className="pb-20">
          {invoices?.map((item, index) => {
            if (
              statusFiltersArray.includes(item.status) ||
              statusFiltersArray.length === 0
            ) {
              return (
                <Invoice
                  id={item.id}
                  clientName={item.clientName}
                  paymentDue={item.paymentDue}
                  total={item.total}
                  status={item.status}
                  key={index}
                  // setNewInvoiceModalOpen={setNewInvoiceModalOpen}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Invoices;
