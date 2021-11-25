import React, { memo } from "react";
import { Form, Input, Select, Button } from "antd";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import adminApi from "apis/adminApi";

function AddMainJobManagement(props) {
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
      <Form.Item label="Status" name="status">
        <Select
          name="status"
          onChange={(e) => {
            if (e === "ACTIVE") {
              setFieldValue("status", true);
            } else {
              setFieldValue("status", false);
            }
          }}
          onBlur={handleBlur}
          placeholder="Select status"
        >
          <Select.Option name="status" value="ACTIVE">
            ACTIVE
          </Select.Option>
          <Select.Option name="status" value="DISABLE">
            DISABLE
          </Select.Option>
        </Select>
        {errors.status && touched.status && (
          <small className="text-red-500">{errors.status}</small>
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

const MyAddMainForm = withFormik({
  mapPropsToValues: () => ({
    name: "",
    status: "",
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        "This is not a name"
      ),
    status: Yup.string().required("Status is required"),
  }),

  handleSubmit: (values, { props }) => {
    adminApi
      .fetchAddMainJob(values, props.token)
      .then((result) => {
        alert("Add main job success");
      })
      .catch((err) => {
        alert(err);
      });
  },

  displayName: "AddMainJobForm",
})(AddMainJobManagement);

const mapStateToProps = (state) => ({
  token: state.authReducer.currentUser.token,
});

export default connect(mapStateToProps)(memo(MyAddMainForm));
