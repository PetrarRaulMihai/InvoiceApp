import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("This field cannot be empty"),
  password: yup
    .string()
    .min(6, "The password must be minimum 6 characters long")
    .required("This field cannot be empty"),
});

export default validationSchema;
