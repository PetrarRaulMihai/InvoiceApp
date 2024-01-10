import "./App.css";
import supabase from "./config/supabaseClient";
import Header from "./Components/Headers";
import Invoices from "./Components/Invoices";
import { Routes, Route } from "react-router-dom";
import InvoicePage from "./Components/InvoicePage";
import { useEffect, useState } from "react";
import EditInvoice from "./Components/EditInvoice";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import UserProfile from "./Components/UserProfile";
import NewInvoice from "./Components/NewInvoice";
import Footer from "./Components/Footer";

function App() {
  const [fetchError, setFetchError] = useState(null);
  // const [newInvoiceModalOpen, setNewInvoiceModalOpen] = useState(false);

  //state to act like database
  const [invoices, setInvoices] = useState(null);

  //flag to update the main page
  const [flagToUpdateMainPage, setFlagToUpdateMainPage] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data, error } = await supabase
          .from("InvoiceApp-Invoices")
          .select();

        if (error) {
          setFetchError(`Could not fetch invoices: ${error.message}`);
          setInvoices(null);
          console.error(error);
        }

        if (data) {
          setInvoices(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchInvoices();
  }, [flagToUpdateMainPage]);

  return (
    <div>
      {/* <Invoices path='/'></Invoices> */}
      <Routes>
        <Route path={"/register"} element={<Register />}></Route>
        <Route path={"/"} element={<Login />}></Route>

        <Route
          path="/home"
          element={
            <>
              <Header />{" "}
              <Invoices fetchError={fetchError} invoices={invoices} />
              <Footer />
            </>
          }
        />

        <Route
          path={`/invoice/:id`}
          element={
            <>
              <Header />{" "}
              <InvoicePage
                invoices={invoices}
                setInvoices={setInvoices}
                flagToUpdateMainPage={flagToUpdateMainPage}
                setFlagToUpdateMainPage={setFlagToUpdateMainPage}
              />
              <Footer />
            </>
          }
        ></Route>

        <Route
          path="/new-invoice"
          element={
            <>
              <Header />
              <NewInvoice setFlagToUpdateMainPage={setFlagToUpdateMainPage} />
              <Footer />
            </>
          }
        ></Route>

        <Route
          path="/edit-invoice"
          element={
            <>
              <Header />
              <EditInvoice
                invoices={invoices}
                setFlagToUpdateMainPage={setFlagToUpdateMainPage}
              />
              <Footer />
            </>
          }
        ></Route>

        <Route
          path="/user-info"
          element={
            <>
              <Header />
              <UserProfile />
              <Footer />
            </>
          }
        ></Route>
      </Routes>
      <p className="text-center">
        For testing create a user or please use user: ayrton.senna@gmail.com
        password: Parola123!
      </p>
    </div>
  );
}

export default App;
