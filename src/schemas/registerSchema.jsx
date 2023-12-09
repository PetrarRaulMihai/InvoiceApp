import * as yup from "yup";

// Validation schema of YUP

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  streetAddress: yup.string().required("Street Address is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  mobileNumber: yup.string().required("Mobile Number is required"),
});

export default validationSchema;
