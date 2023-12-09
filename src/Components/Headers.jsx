import logo from "../assets/logo.svg";
import "../styles/header.css";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const loggedUserId = localStorage.getItem("userId");
  const [userInitials, setUserInitials] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const goToUserProfilePage = () => {
    navigate("/user-info");
  };

  const goToTheMainPage = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchInitials = async () => {
      try {
        const { data, error } = await supabase
          .from("InvoiceApp-Users")
          .select()
          .eq("id", loggedUserId);

        if (error) {
          console.error("Error fetching data:", error.message);
          return null;
        }

        setUserInitials(
          data[0]?.firstName.charAt(0) + data[0]?.lastName.charAt(0)
        );
      } catch (error) {
        console.error("Error:", error.message);
        return null;
      }
    };

    fetchInitials();
  }, [loggedUserId]);

  //change between light mode and dark mode

  useEffect(() => {
    const htmlElement = document.documentElement;
    darkMode
      ? htmlElement.classList.add("dark")
      : htmlElement.classList.remove("dark");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="w-full bg-[#20243c] flex justify-between">
      <div className="flex items-center justify-between w-full border-r border-r-gray-400">
        <div
          className="bg-[#7c5df9] cursor-pointer rounded-r-3xl h-full flex items-center p-6"
          onClick={goToTheMainPage}
        >
          <img src={logo} className="w-9"></img>
        </div>

        <div className="pr-6 ">
          <img
            src={darkMode ? sun : moon}
            className="w-7 animate-spin-once"
            onClick={toggleDarkMode}
          ></img>
        </div>
      </div>

      <div
        className=" flex items-center w-32 justify-center"
        onClick={goToUserProfilePage}
      >
        <div className="bg-[#7c5df9] rounded-full flex items-center h-14 w-14">
          <p className="rounded-full m-auto  text-center text-white font-semibold text-3xl cursor-pointer">
            {" "}
            {userInitials}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
