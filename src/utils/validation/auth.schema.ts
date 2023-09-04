import * as Yup from "yup";

export const validationSignUpSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters long"),
  passwordConfirm: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null as any], "Passwords do not match!"),
});

export const validationSignInSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters long"),
});
