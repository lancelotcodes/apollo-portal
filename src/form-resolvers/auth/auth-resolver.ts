import { emailRegex } from "@/helpers/regex/email-regex";
import * as yup from "yup";

export const genericResolver = {
  username: yup.string().required("Username is required!"),
  email: yup
    .string()
    .required("Email address required!")
    .matches(emailRegex, { message: "Invalid email address!" }),
  password: yup.string().required("Password required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password did not match!")
};

export const forgotPasswordSchema = yup.object().shape({
  email: genericResolver.email
});

export const resetPasswordchema = yup.object().shape({
  password: genericResolver.password,
  confirmPassword: genericResolver.confirmPassword
});

export const loginSchema = yup.object().shape({
  username: genericResolver.username,
  password: genericResolver.password
});
