import validationSchema from "../schemas/loginSchema";
import supabase from "../config/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import bcrypt from "bcryptjs";

function Login() {
  const [credentialsIncorect, setCredentialsIncorect] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: () => {
      checkIfCredentialsAreCorrect();
    },
  });

  const checkIfCredentialsAreCorrect = async () => {
    if (formik.isValid) {
      try {
        const { data, error } = await supabase
          .from("InvoiceApp-Users")
          .select();
        const userFound = await data.find((user) => {
          return user.email === formik.values.email.toLowerCase();
        });

        //checks for bycript match
        const passwordMatch = await bcrypt.compare(
          formik.values.password,
          userFound.password
        );

        if (!passwordMatch) {
          setCredentialsIncorect(true);
        }

        if (userFound && passwordMatch) {
          localStorage.setItem("userId", userFound.id);
          navigate(`/home`, { replace: true });
          setCredentialsIncorect(false);
        }
      } catch (error) {
        setCredentialsIncorect(true);
        console.error("error", error);
      }
    }
  };

  return (
    <div className="w-4/5 max-w-xs m-auto mt-32">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white dark:bg-red-400 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className={`outline-none py-2 pr-4 block w-full border-b-2 ${
              formik.errors.email ? "border-red-400" : " border-gray-300"
            } ${credentialsIncorect ? "border-red-400" : ""}`}
            type="text"
            placeholder="Please enter your email"
            name="email"
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-400">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`outline-none py-2 pr-4 block w-full border-b-2 ${
              formik.errors.password ? "border-red-400" : " border-gray-300"
            } ${credentialsIncorect ? "border-red-400" : ""}`}
            id="password"
            type="password"
            placeholder="******************"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-400">{formik.errors.password}</p>
          ) : null}
          {credentialsIncorect && (
            <p className="text-red-400">Email or password wrong</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={checkIfCredentialsAreCorrect}
            className="bg-[#7c5dfa] cursor-pointer rounded-full active:opacity-75 text-white font-bold p-2 focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!formik.values.email || !formik.values.password}
          >
            Sign In
          </button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-[#7c5dfa] rounded-full p-2 border-2 border-[#7c5dfa] active:opacity-75"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
