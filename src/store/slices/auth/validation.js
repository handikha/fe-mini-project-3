import * as Yup from "yup";

// @define register validation schema
export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required.")
    .min(6, "Username must be at least 6 characters.")
    .max(20, "Username must be less than 20 characters."),
  email: Yup.string().email("Email must be a valid email."),
  phone: Yup.string().matches(/^[0-9]+$/, "Phone must be numeric."),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match."
  ),
});

// @login validation
export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required.")
    .min(5, "Username must be at least 6 characters.")
    .max(20, "Username must be less than 20 characters."),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric."),
});

// @define register validation schema
export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match."
  ),
});

// @Change Password validation schema
export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .required("Current password is required.")
    .min(6, "Password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric."),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "password must be at least 6 characters.")
    .matches(/^[a-zA-Z0-9]+$/, "password must be alphanumeric."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match."
  ),
});
