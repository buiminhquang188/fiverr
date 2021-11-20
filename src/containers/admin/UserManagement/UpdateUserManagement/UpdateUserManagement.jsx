import React, { memo, useEffect, useState } from "react";
import { Form, Input, DatePicker, Select, Tag, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import adminApi from "apis/adminApi";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function UpdateUserManagement(props) {
  const { userNeedUpdate } = props;
  console.log("userNeedUpdate", userNeedUpdate);
  const [form] = Form.useForm();
  const [userUpdate, setUserUpdate] = useState({
    arrUser: null,
    isLoading: true,
  });
  const onClear = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    handleSubmit();
    onClear();
  };

  useEffect(() => {
    form.resetFields();
    setUserUpdate({
      arrUser: userNeedUpdate,
      isLoading: false,
    });
  }, [userNeedUpdate]);

  console.log("Render UpdateUserManagement");

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  console.log(values);
  if (userUpdate.isLoading) return <antIcon />;
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="Name" name="name">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="name"
          placeholder="Enter name"
          defaultValue={userUpdate.arrUser.name}
        />
        {errors.name && touched.name && (
          <small className="text-red-500">{errors.name}</small>
        )}
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          placeholder="Enter email"
          defaultValue={userUpdate.arrUser.email}
        />
        {errors.email && touched.email && (
          <small className="text-red-500">{errors.email}</small>
        )}
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="phone"
          placeholder="Enter Phone number"
          defaultValue={userUpdate.arrUser.phone}
        />
        {errors.phone && touched.phone && (
          <small className="text-red-500">{errors.phone}</small>
        )}
      </Form.Item>
      <Form.Item label="DatePicker" name="birthday">
        <DatePicker
          name="birthday"
          onChange={(e) =>
            setFieldValue("birthday", moment(e).format("YYYY-MM-DD"))
          }
          onBlur={handleBlur}
          defaultValue={moment(userUpdate.arrUser.birthday.substring(0, 10))}
        />
        {errors.birthday && touched.birthday && (
          <small className="text-red-500 block">{errors.birthday}</small>
        )}
      </Form.Item>
      <Form.Item label="Gender" name="gender">
        <Select
          name="gender"
          onChange={(e) => {
            if (e === "MALE") {
              setFieldValue("gender", true);
            } else {
              setFieldValue("gender", false);
            }
          }}
          onBlur={handleBlur}
          placeholder="Select gender"
          defaultValue={userUpdate.arrUser.gender ? "MALE" : "FEMALE"}
        >
          <Select.Option name="gender" value="MALE">
            Male
          </Select.Option>
          <Select.Option name="gender" value="FEMALE">
            Female
          </Select.Option>
        </Select>
        {errors.gender && touched.gender && (
          <small className="text-red-500">{errors.gender}</small>
        )}
      </Form.Item>
      <Form.Item label="Role" name="role">
        <Select
          name="role"
          onChange={(e) => setFieldValue("role", e)}
          onBlur={handleBlur}
          placeholder="Select role"
          defaultValue={userUpdate.arrUser.role}
        >
          <Select.Option name="role" value="CLIENT">
            CLIENT
          </Select.Option>
          <Select.Option name="role" value="ADMIN">
            ADMIN
          </Select.Option>
        </Select>
        {errors.role && touched.role && (
          <small className="text-red-500">{errors.role}</small>
        )}
      </Form.Item>
      <Form.Item label="Skills" name="skill">
        <Input
          style={{ width: "calc(100% - 200px)" }}
          name="skill"
          placeholder='Type Skill & Press "Enter" on keyboard'
          onPressEnter={(e) => {
            setFieldValue("skill", [
              ...userUpdate.arrUser.skill,
              e.target.value,
            ]);
            form.resetFields(["skill"]);
          }}
        />
        <br />
        {userUpdate.arrUser.skill.length === 0 ? (
          <Tag>No Skill</Tag>
        ) : (
          userUpdate.arrUser.skill.map((skill) => {
            return (
              <Tag
                color="blue"
                className="block"
                key={skill}
                closable
                onClose={() => {
                  setFieldValue(
                    "skill",
                    values.skill.filter((item) => item !== skill)
                  );
                }}
              >
                {skill}
              </Tag>
            );
          })
        )}
        {errors.skill && touched.skill && (
          <small className="text-red-500 block">{errors.skill}</small>
        )}
      </Form.Item>
      <Form.Item label="Certification" name="certification">
        <Input
          style={{ width: "calc(100% - 200px)" }}
          name="certification"
          onPressEnter={(e) => {
            setFieldValue("certification", [
              ...userUpdate.arrUser.certification,
              e.target.value,
            ]);
            form.resetFields(["certification"]);
          }}
          placeholder='Type Certification & Press "Enter" on keyboard'
        />
        <br />
        {userUpdate.arrUser.certification.length === 0 ? (
          <Tag>No Certification</Tag>
        ) : (
          userUpdate.arrUser.certification.map((certifi) => {
            return (
              <Tag
                color="red"
                className="block"
                key={certifi}
                closable
                onClose={() => {
                  setFieldValue(
                    "certification",
                    userUpdate.arrUser.certification.filter(
                      (item) => item !== certifi
                    )
                  );
                }}
              >
                {certifi}
              </Tag>
            );
          })
        )}
        {errors.certification && touched.certification && (
          <small className="text-red-500 block">{errors.certification}</small>
        )}
      </Form.Item>
      <Form.Item label="Action">
        <Button type="primary" htmlType="submit" className="mr-2">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}

const MyUpdateUserForm = withFormik({
  mapPropsToValues: (props) => ({
    name: props.userNeedUpdate.name,
    email: props.userNeedUpdate.email,
    phone: props.userNeedUpdate.phone,
    birthday: moment(props.userNeedUpdate.birthday).format("YYYY-MM-DD"),
    gender: props.userNeedUpdate.gender,
    role: props.userNeedUpdate.role,
    skill: props.userNeedUpdate.skill,
    certification: props.userNeedUpdate.certification,
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        "This is not a name"
      ),
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid!"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Phone is invalid"
      )
      .min(10, "Phone must be at least 10 numbers")
      .max(11, "Phone must be less than 11 numbers"),
    birthday: Yup.date()
      .nullable("Birthday is required")
      .required("Birthday is required"),
    gender: Yup.boolean().required("Gender is required"),
    role: Yup.string().required("Role is required"),
    skill: Yup.array().required("Skill is required"),
    certification: Yup.array().required("Certification is required"),
  }),

  handleSubmit: (values, { setSubmitting, props, resetForm }) => {
    console.log(values);
    adminApi
      .fetchUpdateUser(props.userNeedUpdate._id, values)
      .then((result) => {
        console.log(result);
        alert("Update User Success");
        props.updateVisible(false);
      })
      .catch((err) => {
        alert(err);
      });
  },
  displayName: "UpdateUserForm",
})(UpdateUserManagement);

export default memo(MyUpdateUserForm);
