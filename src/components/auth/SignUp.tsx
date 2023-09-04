import { useState } from "react";
import { Formik, Form, Field } from "formik";
import styles from "./auth.module.scss";
import { useTranslation } from "react-i18next";
import { validationSignUpSchema } from "../../utils/validation/auth.schema";
import ErrorInput from "../UI/error-input/ErrorInput";
import classnames from "classnames";
import { signUp } from "../../config/firebase";

interface Props {
  onToggleForm: any;
}

function SignUp({ onToggleForm }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const textAlreadyHaveAnAccount = t("alreadyHaveAnAccount");
  const textSignInHere = t("signInHere");
  const textSignUp = t("signUp");
  const textPassword = t("password");
  const textEmail = t("email");

  async function handleSignUp(values: any) {
    try {
      await signUp(values.email, values.password);
    } catch (error) {
      alert("error signing up");
    }
  }

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{ email: "", password: "", passwordConfirm: "" }}
        validationSchema={validationSignUpSchema}
        onSubmit={handleSignUp}
      >
        {({ touched, errors }) => (
          <Form className={styles.signUpForm}>
            <div
              className={classnames(styles.formInputWrapper, {
                [styles.invalid]: touched.email && errors.email,
              })}
            >
              <Field
                id="sign-up-email"
                name="email"
                placeholder={`${textEmail}...`}
              ></Field>
              {errors.email && touched.email && (
                <ErrorInput message={errors.email} />
              )}
            </div>
            <div
              className={classnames(styles.formInputWrapper, {
                [styles.invalid]: touched.password && errors.password,
              })}
            >
              <Field
                type="password"
                id="sign-up-password"
                name="password"
                placeholder={`${textPassword}...`}
              ></Field>
              {errors.password && touched.password && (
                <ErrorInput message={errors.password} />
              )}
            </div>
            <div
              className={classnames(styles.formInputWrapper, {
                [styles.invalid]:
                  touched.passwordConfirm && errors.passwordConfirm,
              })}
            >
              <Field
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder={`${textPassword}...`}
              ></Field>
              {errors.passwordConfirm && touched.passwordConfirm && (
                <ErrorInput message={errors.passwordConfirm} />
              )}
            </div>
            <div className={styles.formControls}>
              <button disabled={isLoading} type="submit">
                {textSignUp}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        {textAlreadyHaveAnAccount}{" "}
        <button onClick={onToggleForm}>{textSignInHere}</button>
      </div>
    </div>
  );
}

export default SignUp;
