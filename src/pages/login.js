import "../styles/login.css";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import Input from "../components/Input/input";
import YupPassword from "yup-password";
import { apiInstance } from "../utils/utils";
import { setAdmin } from "../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

YupPassword(Yup);

// password: Yup.string()
//     .password()
//     // .minLowercase(8) // raise the lowercase requirement to 8
//     // .min(0) // disable minimum characters completely
//     .required("Required"), // add an additional rule

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"), // add an additional rule
});
const Login = () => {
  let navigation = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (login) {
      dispatch(setAdmin(token));
      navigation("/adminTimeline");
    }
  }, [login]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="container">
      <div className="main">
        <div className="login__card">
          <h1 className="login__head">Login</h1>
          <div className="login__body">
            <div className="login__container">
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(info) => {
                  apiInstance
                    .post("/users/signin", {
                      email: info.email,
                      password: info.password,
                    })
                    .then((resp) => {
                      setToken(resp.data.data);
                      setLogin(true);
                    })
                    .catch((err) => {
                      setErrorMessage(err.response.data.error);
                    });
                }}
                enableReinitialize
              >
                {(formik) => (
                  <Form className="login__form">
                    <div className="login__inputs">
                      <Input type="text" name="email" placeholder="email" />
                      <Input
                        type="password"
                        name="password"
                        placeholder="password"
                      />
                    </div>
                    <div className="login__error">
                      {errorMessage && errorMessage.length > 0
                        ? errorMessage
                        : null}
                    </div>
                    <button className="login__button" type="sumbit">
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
