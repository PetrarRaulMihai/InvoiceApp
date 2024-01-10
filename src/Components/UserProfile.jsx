import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const loggedUserId = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchElementById = async () => {
      try {
        const { data, error } = await supabase
          .from("InvoiceApp-Users")
          .select()
          .eq("id", loggedUserId);

        if (error) {
          console.error("Error fetching data:", error.message);
          return null;
        }

        setUserInfo(data[0]);
      } catch (error) {
        console.error("Error:", error.message);
        return null;
      }
    };
    fetchElementById();
  }, [loggedUserId]);

  //function to log out
  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/", { replace: true });
  };

  return (
    <div className=" bg-[#f8f8fb] overflow-hidden shadow border dark:bg-[#141625] pt-24 px-3 text-white pb-44 xl:h-screen sm:px-28 md:px-44 lg:px-64 xl:px-[450px] 2xl:px-[600px]">
      <div className="px-4 py-10 sm:px-6 flex justify-between items-center text-center">
        <h3 className="text-lg leading-6 font-medium text-black dark:text-white ">
          {userInfo?.firstName}
        </h3>
        <button
          type="button"
          onClick={logout}
          className="bg-[#7c5df9] p-3 rounded-full text-white"
        >
          Log Out
        </button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0 ">
        <div className="sm:divide-y sm:divide-gray-200 text-white">
          <div className="py-3 sm:py-5  sm:gap-4 sm:px-6 flex justify-between">
            <p className="text-sm font-medium text-black dark:text-white items-center">
              Full name
            </p>
            <p className="mt-1 text-sm text-black dark:text-white sm:mt-0  items-center">
              {userInfo?.lastName + " " + userInfo?.firstName}
            </p>
          </div>
          <div className="py-3 sm:py-5  sm:gap-4 sm:px-6 flex justify-between items-center">
            <p className="text-sm font-medium text-black dark:text-white items-center">
              Email address
            </p>
            <p className="mt-1 text-sm text-black dark:text-white sm:mt-0 items-center">
              {userInfo.email}
            </p>
          </div>
          <div className="py-3 sm:py-5 sm:gap-4 sm:px-6 flex justify-between">
            <p className="text-sm font-medium text-black dark:text-white items-center">
              Phone number
            </p>
            <p className="mt-1 text-sm text-black dark:text-white sm:mt-0 items-center">
              {userInfo.mobileNumber}
            </p>
          </div>
          <div className="py-3 sm:py-5  sm:gap-4 sm:px-6 flex justify-between text-right">
            <p className="text-sm font-medium text-black dark:text-white items-center">
              Address
            </p>
            <p className="mt-1 text-sm text-black dark:text-white sm:mt-0 items-center">
              {userInfo.streetAddress} <br />
              {userInfo.city} <br />
              {userInfo.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
