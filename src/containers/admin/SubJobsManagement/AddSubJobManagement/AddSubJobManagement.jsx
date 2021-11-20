import React, { memo, useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import adminApi from "apis/adminApi";
const { Option } = Select;

function AddSubJobManagement(props) {
  const { checkType, updateSubJobData } = props;
  console.log(checkType);
  console.log(updateSubJobData);
  const [form] = Form.useForm();
  const [tagMainJob, setTagMainJob] = useState({
    tagMainJobList: [],
  });
  useEffect(() => {
    adminApi
      .fetchMainJobsInformation()
      .then((result) => {
        setTagMainJob({
          tagMainJobList: result.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  // clear form
  const onClear = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    handleSubmit();
    onClear();
  };

  console.log("Render AddSubJobManagement");
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
          defaultValue={checkType ? "" : updateSubJobData.name}
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
          defaultValue={checkType ? "" : (updateSubJobData.status ? "ACTIVE" : "DISABLE")}
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
      <Form.Item label="Select Type Job" name="typeJob">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select type job"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(e) => setFieldValue("typeJob", e)}
          name="typeJob"
        >
          {tagMainJob.tagMainJobList.map((typeJob) => {
            return (
              <Option key={typeJob._id} value={typeJob._id} name="typeJob">
                {typeJob.name}
              </Option>
            );
          })}
        </Select>
        {errors.typeJob && touched.typeJob && (
          <small className="text-red-500 block">{errors.typeJob}</small>
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

const MyAddSubForm = withFormik({
  mapPropsToValues: () => ({
    name: "",
    status: "",
    typeJob: "",
  }),

  validationSchema: Yup.object().shape({
    // name: Yup.string()
    //   .required("Name is required")
    //   .min(3, "Sub Job must have at least 3 characters")
    //   .max(20, "Sub Job must have at most 20 characters"),
    // status: Yup.string().required("Status is required"),
    // typeJob: Yup.string().required("Type Job is required"),
  }),

  handleSubmit: (values, { setSubmitting, props, resetForm }) => {
    console.log(values);
    console.log(props);
    if (props.checkType) {
      adminApi
        .fetchAddSubJob(values)
        .then((result) => {
          alert("Add Sub Job Successfully");
          console.log(result);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      adminApi
        .fetchUpdateSubJob(values)
        .then((result) => {
          alert("Update Sub Job Successfully");
          console.log(result);
        })
        .catch((err) => {
          alert("Can't Update Sub Job");
          console.log(err);
        });
    }
  },

  displayName: "AddMainJobForm",
})(AddSubJobManagement);

export default memo(MyAddSubForm);
