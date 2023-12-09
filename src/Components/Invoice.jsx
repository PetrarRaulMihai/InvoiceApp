import InvoicePage from "./InvoicePage";
import { useEffect, useState } from "react";
import useUserId from "../stores/UserId";
import { Link } from "react-router-dom";

function Invoice({ id, clientName, paymentDue, total, status }) {
  const { userId, setUserId } = useUserId();

  // function to transform from  ex: "2021-08-19" to Aug 19, 2021
  const formatDate = (dateToChange) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateToChange);

    return date.toLocaleDateString(undefined, options);
  };

  //   format data, added comma as a separator

  //   format data execution
  const formatedData = formatDate(paymentDue);

  const getUserId = (param) => {
    setUserId(param);
  };

  return (
    <Link to={`/invoice/${id}`}>
      <div className="px-4 py-3 " onClick={() => getUserId(id)}>
        {/* invoice build */}
        <div className=" bg-white dark:bg-[#1f213a] px-6 rounded-lg py-3">
          {/* id + name */}
          <div className="flex justify-between pb-5 text-white">
            <p className="text-black dark:text-white">
              <span className="text-[#7c5df9] ">#</span>
              {id}
            </p>
            <p className="text-gray-400">{clientName}</p>
          </div>

          {/* container  */}
          <div className="flex justify-between items-center">
            {/* due date + total */}
            <div className="flex flex-col text-white">
              <p className="text-gray-400">Due {formatedData}</p>
              <p className="font-bold text-black dark:text-white">${total}</p>
            </div>

            {/* payment status */}

            <div>
              <p
                className={`w-32 p-3 text-center rounded-lg font-semibold ${
                  status === "paid"
                    ? "bg-[#33d69f0f] text-[#33d69f]"
                    : status === "pending"
                    ? "bg-[#ff8f000f] text-[#ff8f00]"
                    : status === "draft"
                    ? "bg-[#dfe3fa0f] text-[#dfe3fa]"
                    : "text-[#ff8f00]"
                }`}
              >
                &#9679;<span className="pr-2"></span> {status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Invoice;
