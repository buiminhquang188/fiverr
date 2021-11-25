import React, { memo } from "react";
import { Form, Input, DatePicker, Select, Tag, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import moment from "moment";
import adminApi from "apis/adminApi";

function AddUserManagement(props) {
  const [form] = Form.useForm();

  // clear form
  const onClear = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    handleSubmit();
    onClear();
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
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
        />
        {errors.email && touched.email && (
          <small className="text-red-500">{errors.email}</small>
        )}
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          placeholder="Enter password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        {errors.password && touched.password && (
          <small className="text-red-500">{errors.password}</small>
        )}
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="phone"
          placeholder="Enter Phone number"
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
            setFieldValue("skill", [...values.skill, e.target.value]);
            form.resetFields(["skill"]);
          }}
        />
        <br />
        {values.skill.length === 0 ? (
          <Tag>No Skill</Tag>
        ) : (
          values.skill.map((skill) => {
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
              ...values.certification,
              e.target.value,
            ]);
            form.resetFields(["certification"]);
          }}
          placeholder='Type Certification & Press "Enter" on keyboard'
        />
        <br />
        {values.certification.length === 0 ? (
          <Tag>No Certification</Tag>
        ) : (
          values.certification.map((certifi) => {
            return (
              <Tag
                color="red"
                className="block"
                key={certifi}
                closable
                onClose={() => {
                  setFieldValue(
                    "certification",
                    values.certification.filter((item) => item !== certifi)
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
          Submit
        </Button>
        <Button type="danger" htmlType="button" onClick={onClear}>
          Clear
        </Button>
      </Form.Item>
    </Form>
  );
}

const MyAddUserForm = withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: "",
    role: "",
    skill: "",
    certification: "",
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
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 20 characters"),
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

  handleSubmit: (values, { props }) => {
    adminApi
      .fetchAddUser(values, props.token)
      .then((result) => {
        alert("Add User Successfully!");
      })
      .catch((err) => {
        alert("User have exist!");
      });
  },

  displayName: "AddUserForm",
})(AddUserManagement);

const mapStateToProps = (state) => ({
  token: state.authReducer.currentUser.token,
});

export default connect(mapStateToProps)(memo(MyAddUserForm));
