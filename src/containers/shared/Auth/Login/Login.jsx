import React, { memo, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/outline";
import { withFormik, Field } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { actLogin, actLoginFailure } from "../module/action";
import Loader from "components/Loader/Loader";

function Login(props) {
  const { loading, error, currentUser } = useSelector(
    (state) => state.authReducer
  );
  useEffect(() => {
    props.dispatch(actLoginFailure(null));
  }, []);
  const { touched, errors, handleChange, handleBlur, handleSubmit } = props;
  if (loading) return <Loader />;
  return !currentUser ? (
    <div className="max-h-screen w-full max-w-full h-screen">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Log in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/signup"
                className="font-medium text-green-600 hover:text-green-500"
              >
                click here to sign up
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-2">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Field
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.email && touched.email && (
                <div className="text-red-500 flex pl-2">{errors.email}</div>
              )}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.password && touched.password && (
                <div className="text-red-500 flex pl-2">{errors.password}</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="ml-2 text-red-500">{error}</div>
              </div>
              <div className="text-sm">
                <Link
                  to="/"
                  className="font-medium text-green-600 hover:text-green-500"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Ondoing");
                  }}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

const LoginFiverrWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invailid!"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have min 6 characters")
      .max(100, "Password must have max 100 characters"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(actLogin(values, props.history));
  },

  displayName: "Login Fiverr",
})(Login);

const mapStateToProps = (state) => ({
  stateLogin: state.authReducer,
  loading: state.authReducer.loading,
  error: state.authReducer.error,
});

export default connect(mapStateToProps)(LoginFiverrWithFormik);
