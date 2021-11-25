import React, { memo, useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import adminApi from "apis/adminApi";
const { Option } = Select;

function UpdateMainJobManagement(props) {
  const { updateMainJobData, jobId, allSubJobData } = props;

  const [tagSubJobList, setTagSubJobList] = useState({
    tagAllSubJob: [],
    isLoading: true,
  });

  useEffect(() => {
    form.resetFields();
    compareTwoMainSubJob();
  }, [jobId]);

  // compare two main job & sub job
  const compareTwoMainSubJob = () => {
    const result = allSubJobData
      .filter(
        ({ _id: id1 }) =>
          !updateMainJobData.subTypeJobs.some(({ _id: id2 }) => id2 === id1)
      )
      .map(({ _id: id, name }) => ({ id, name, isChoosen: false }));
    const result2 = updateMainJobData.subTypeJobs.map((items) => {
      const { _id: id, name } = items;
      return { id, name, isChoosen: true };
    });
    const newArr = result.concat(result2);
    setTagSubJobList({
      tagAllSubJob: newArr,
    });
  };

  //const handle change select
  const handleChangeSelect = (value) => {
    const result = tagSubJobList.tagAllSubJob.map((items) => {
      const { id, name } = items;
      if (value.includes(name)) {
        return { id, name, isChoosen: true };
      } else {
        return { id, name, isChoosen: false };
      }
    });
    setTagSubJobList({
      tagAllSubJob: result,
    });
  };
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
  if (tagSubJobList.isLoading) return <antIcon />;

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
          defaultValue={updateMainJobData.name}
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
          defaultValue={updateMainJobData.status ? "ACTIVE" : "DISABLE"}
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

      <Form.Item label="Select Type Job" name="subTypeJobs">
        <Select
          showSearch
          allowClear
          mode={"multiple"}
          placeholder="Select type job"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(e) => {
            handleChangeSelect(e);
            setFieldValue("subTypeJobs", e);
          }}
          name="subTypeJobs"
          defaultValue={tagSubJobList.tagAllSubJob
            .filter((items) => items.isChoosen)
            .map((tag) => tag.name)}
          width="200"
        >
          {tagSubJobList.tagAllSubJob
            .filter((tag) => !tag.isChoosen)
            .map((typeJob) => {
              return (
                <Option key={typeJob.id} value={typeJob.id} name="typeJob">
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
      </Form.Item>
    </Form>
  );
}

const MyUpdateMainJobForm = withFormik({
  mapPropsToValues: (props) => ({
    name: props.updateMainJobData.name,
    status: props.updateMainJobData.status,
    subTypeJobs: props.updateMainJobData.subTypeJobs.map(
      (subJob) => subJob._id
    ),
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Sub Job must have at least 3 characters")
      .max(20, "Sub Job must have at most 20 characters"),
    status: Yup.string().required("Status is required"),
    subTypeJobs: Yup.array().required("Sub Job is required"),
  }),

  handleSubmit: (values, { setSubmitting, props, resetForm }) => {
    adminApi
      .fetchUpdateMainJob(props.jobId, values, props.token)
      .then((result) => {
        alert("Update main job success");
        props.handleUpdateCb();
      })
      .catch((err) => {
        alert(err);
      });
  },

  displayName: "AddMainJobForm",
})(UpdateMainJobManagement);

const mapStateToProps = (state) => ({
  token: state.authReducer.currentUser.token,
});

export default connect(mapStateToProps)(memo(MyUpdateMainJobForm));
