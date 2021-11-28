import React, { memo } from "react";
import { LockClosedIcon } from "@heroicons/react/outline";
import { withFormik, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DatePicker, Input, Select, Form, Tag } from "antd";
import moment from "moment";
import { actSignUp } from "../module/action";
const { Option } = Select;

function SignUp(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const newRegexSpace = new RegExp("^\\s+$");

  return (
    <div className="max-h-screen w-full max-w-full h-full mb-32 mt-10">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign Up to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                click here to login
              </Link>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="flex justify-start">
                <div className="w-full">
                  <div className="mb-2">
                    <label htmlFor="name" className="sr-only">
                      Enter your name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 flex pl-2">
                        {errors.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
              <div className="mb-2">
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
              <div className="mb-2">
                <label htmlFor="phone" className="sr-only">
                  Enter your phone number
                </label>
                <Field
                  id="phone"
                  name="phone"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone && (
                  <div className="text-red-500 flex pl-2">{errors.phone}</div>
                )}
              </div>
              <div className="flex justify-start">
                <div className="w-full">
                  <div className="-mb-4">
                    <Form.Item name="skill">
                      <Input
                        name="skill"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                        placeholder="Press 'Enter' to enter your skill"
                        //   onChange={handleChange}
                        //   onBlur={handleBlur}
                        onPressEnter={(e) => {
                          e.preventDefault();
                          if (
                            e.target.value === "" ||
                            newRegexSpace.test(e.target.value)
                          ) {
                            alert("No space allow at the begining!!");
                            return;
                          } else {
                            const newSkill = e.target.value.replace(
                              /^ +/gm,
                              ""
                            );
                            setFieldValue("skill", [...values.skill, newSkill]);
                          }
                        }}
                      />
                      {values.skill.length > 0 &&
                        values.skill.map((tag) => (
                          <Tag closable className="flex mt-2 justify-start">
                            {tag}
                          </Tag>
                        ))}
                      {errors.skill && touched.skill && (
                        <div className="text-red-500 flex pl-2">
                          {errors.skill}
                        </div>
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className="ml-2 w-full">
                  <div className="-mb-4">
                    <Form.Item name="certification">
                      <Input
                        name="certification"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                        placeholder="Press 'Enter' to enter your certification"
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        onPressEnter={(e) => {
                          e.preventDefault();
                          if (
                            e.target.value === "" ||
                            newRegexSpace.test(e.target.value)
                          ) {
                            alert("No space at the begining");
                            return;
                          } else {
                            const newCertification = e.target.value.replace(
                              /^ +/gm,
                              ""
                            );
                            setFieldValue("certification", [
                              ...values.certification,
                              newCertification,
                            ]);
                          }
                        }}
                      />
                      {values.certification.length > 0 &&
                        values.certification.map((tag) => (
                          <Tag closable className="flex mt-2">
                            {tag}
                          </Tag>
                        ))}
                      {errors.certification && touched.certification && (
                        <div className="text-red-500 flex pl-2">
                          {errors.certification}
                        </div>
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="w-full">
                  <div className="mb-2">
                    <label htmlFor="birthday" className="sr-only">
                      Enter your birthday number
                    </label>
                    <DatePicker
                      name="birthday"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your birthday"
                      onChange={(e) => {
                        setFieldValue(
                          "birthday",
                          moment(e).format("YYYY-MM-DD")
                        );
                      }}
                    />
                    {errors.birthday && touched.birthday && (
                      <div className="text-red-500 flex pl-2">
                        {errors.birthday}
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-2 w-full">
                  <label htmlFor="gender" className="sr-only">
                    Enter your gender number
                  </label>
                  <div className="mt-2">
                    <Select
                      className="w-full"
                      name="gender"
                      onChange={(e) => {
                        if (e === "MALE") {
                          setFieldValue("gender", true);
                        } else {
                          setFieldValue("gender", false);
                        }
                      }}
                    >
                      <Option value="MALE">Male</Option>
                      <Option value="FEMALE">Female</Option>
                    </Select>
                    {errors.gender && touched.gender && (
                      <div className="text-red-500 flex pl-2">
                        {errors.gender}
                      </div>
                    )}
                  </div>
                </div>
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const SignUpFiverrWithFormik = withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: "",
    phone: "",
    skill: "",
    certification: "",
    birthday: "",
    gender: "",
    type: "CLIENT",
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("First name is required")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        "This is not a name"
      )
      .trim("No space at the begining"),
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invailid!"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have min 6 characters")
      .max(100, "Password must have max 100 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Phone is invalid"
      )
      .min(10, "Phone must be at least 10 numbers")
      .max(11, "Phone must be less than 11 numbers"),
    skill: Yup.array().required("Skill is required"),
    certification: Yup.array().required("Certification is required"),
    birthday: Yup.date()
      .nullable("Birthday is required")
      .required("Birthday is required"),
    gender: Yup.boolean().required("Gender is required"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(actSignUp(values, props.history));
  },

  displayName: "SignUp Fiverr",
})(SignUp);

const mapStateToProps = (state) => ({
  errorSignUp: state.authReducer.errorSignUp,
});

export default connect(mapStateToProps)(memo(SignUpFiverrWithFormik));
