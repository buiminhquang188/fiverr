import React, { useState, useEffect, useRef } from "react";
import "./AddJob.scss";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Rate,
} from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import adminApi from "apis/adminApi";
import clientApi from "apis/clientApi";
import Loader from "components/Loader/Loader";
import Bookmarks_bro from "assets/images/Bookmarks_bro.svg";

function AddJob(props) {
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = props;
  const history = useHistory();
  const { typeCreate, editJob } = history.location.state;
  const [mainJob, setMainJob] = useState({
    mainJob: [],
    isLoading: true,
  });
  const [subJob, setSubJob] = useState({
    subJob: [],
    isClose: true,
    isChange: false,
  });
  const [chooseSubJob, setChooseSubJob] = useState({
    name: editJob?.subType?.name,
    id: editJob?.subType?._id,
  });

  useEffect(() => {
    adminApi
      .fetchMainJobsInformation()
      .then((result) => {
        setMainJob({
          mainJob: result.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
    window.scrollTo(0, 0);
  }, []);

  const [form] = Form.useForm();
  const onClear = () => {
    form.resetFields();
    setSubJob({
      isClose: true,
    });
  };

  const handleChangeTypeJob = (e) => {
    const listSubJob = mainJob.mainJob.filter((jobID) => jobID._id === e);
    setSubJob({
      subJob: listSubJob[0].subTypeJobs,
      isClose: false,
      isChange: true,
    });
    setFieldValue("type", e);
    setChooseSubJob({
      id: listSubJob[0].subTypeJobs[0]._id,
      name: listSubJob[0].subTypeJobs[0].name,
    });
    setFieldValue("subType", listSubJob[0].subTypeJobs[0]._id);
  };

  const handleChooseSubJob = (e) => {
    if (typeCreate) {
      const listSubJob = subJob.subJob.filter((jobID) => jobID._id === e);
      setFieldValue("subType", e);
      setChooseSubJob({
        id: listSubJob[0]._id,
        name: listSubJob[0].name,
      });
    } else {
      const listSubJob = subJob.subJob.filter((jobID) => jobID._id === e);
      setFieldValue("subType", e);
      setChooseSubJob({
        id: listSubJob[0]._id,
        name: listSubJob[0].name,
      });
    }
  };

  // handleRenderSubJob if typeCreated === false (update job)
  const handleRenderSubJob = (e) => {
    if (!typeCreate) {
      if (!subJob.isChange) {
        const listSubJob = mainJob.mainJob.filter(
          (jobID) => jobID._id === editJob.type._id
        );
        setSubJob({
          subJob: listSubJob[0].subTypeJobs,
          isClose: false,
          isChange: false,
        });
      }
    }
    return;
  };

  if (mainJob.isLoading) return <Loader />;
  return (
    <div className="addjob">
      <div className="lg:max-w-screen-2xl mx-auto pt-12 pb-20">
        <h2 className="text-left">
          {typeCreate ? "What Service Are You Looking For?" : "Update Service"}
        </h2>
        <div className="grid lg:grid-cols-2 mm:grid-cols-1 gap-3">
          <div>
            <div className="addjob__wrapper rounded-lg">
              <div className="addjob__form text-left py-8 px-12">
                <Form
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 14,
                  }}
                  layout="horizontal"
                  initialValues={{
                    size: "default",
                  }}
                  onFinish={handleSubmit}
                >
                  <Form.Item label="Name your job" name="name">
                    <Input
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={typeCreate ? "" : editJob.name}
                    />
                    {errors.name && touched.name && (
                      <small className="text-red-500 block">
                        {errors.name}
                      </small>
                    )}
                  </Form.Item>
                  <Form.Item name="type" label="Select Job">
                    <Select
                      name="type"
                      onChange={(e) => handleChangeTypeJob(e)}
                      onBlur={handleBlur}
                      defaultValue={typeCreate ? "" : editJob.type.name}
                    >
                      {mainJob.mainJob.map((typeMain) => {
                        const { _id, name, status } = typeMain;
                        return (
                          <Select.Option
                            key={_id}
                            value={_id}
                            disabled={!status && status}
                          >
                            {name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    {errors.type && touched.type && (
                      <small className="text-red-500 block">
                        {errors.type}
                      </small>
                    )}
                  </Form.Item>
                  <Form.Item name="subType" label="Select Type Job">
                    <Select
                      name="subType"
                      onChange={(e) => handleChooseSubJob(e)}
                      onBlur={handleBlur}
                      disabled={typeCreate ? subJob.isClose : false}
                      value={chooseSubJob.name}
                      onClick={(e) => handleRenderSubJob(e)}
                    >
                      {subJob.isClose
                        ? ""
                        : subJob.subJob.map((subType) => {
                            const { _id, name, status } = subType;
                            return (
                              <Select.Option
                                key={_id}
                                value={_id}
                                disabled={!status && status}
                              >
                                {name}
                              </Select.Option>
                            );
                          })}
                    </Select>
                    {errors.subType && touched.subType && (
                      <small className="text-red-500 block">
                        {errors.subType}
                      </small>
                    )}
                  </Form.Item>
                  <Form.Item name="price" label="Type price">
                    <InputNumber
                      addonBefore="+"
                      name="price"
                      addonAfter="$"
                      onChange={(e) => setFieldValue("price", e)}
                      defaultValue={typeCreate ? "" : editJob.price}
                    />
                    {errors.price && touched.price && (
                      <small className="text-red-500 block">
                        {errors.price}
                      </small>
                    )}
                  </Form.Item>
                  <Form.Item name="checkbox-group" label="Choose Services">
                    <Row>
                      <Col span={12}>
                        <Checkbox
                          value="proServices"
                          name="proServices"
                          style={{ lineHeight: "32px" }}
                          onChange={(e) =>
                            setFieldValue("proServices", e.target.checked)
                          }
                          defaultChecked={
                            typeCreate ? false : editJob.proServices
                          }
                        >
                          Pro Services
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox
                          value="localSellers"
                          name="localSellers"
                          style={{ lineHeight: "32px" }}
                          onChange={(e) =>
                            setFieldValue("localSellers", e.target.checked)
                          }
                          defaultChecked={
                            typeCreate ? false : editJob.localSellers
                          }
                        >
                          Local Sellers
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox
                          value="onlineSellers"
                          name="onlineSellers"
                          style={{ lineHeight: "32px" }}
                          onChange={(e) =>
                            setFieldValue("onlineSellers", e.target.checked)
                          }
                          defaultChecked={
                            typeCreate ? false : editJob.onlineSellers
                          }
                        >
                          Online Sellers
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox
                          value="deliveryTime"
                          name="deliveryTime"
                          style={{ lineHeight: "32px" }}
                          onChange={(e) =>
                            setFieldValue("deliveryTime", e.target.checked)
                          }
                          defaultChecked={
                            typeCreate ? false : editJob.deliveryTime
                          }
                        >
                          Delivery Time
                        </Checkbox>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item name="rating" label="Rate" onChange={handleChange}>
                    <Rate
                      name="rating"
                      onChange={(e) => setFieldValue("rating", e)}
                      defaultValue={typeCreate ? "" : editJob.rating}
                    />
                    {errors.rating && touched.rating && (
                      <small className="text-red-500 block">
                        {errors.rating}
                      </small>
                    )}
                  </Form.Item>
                  <Form.Item label="Action">
                    <Button type="primary" htmlType="submit" className="mr-2">
                      Submit
                    </Button>
                    {typeCreate && (
                      <Button type="danger" htmlType="reset" onClick={onClear}>
                        Clear
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div className="w-full h-full p-8">
            <img src={Bookmarks_bro} alt="add job" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
const PostAJobWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    name: props.history.location.state.typeCreate
      ? ""
      : props.history.location.state.editJob.name,
    rating: props.history.location.state.typeCreate
      ? ""
      : props.history.location.state.editJob.rating,
    price: props.history.location.state.typeCreate
      ? ""
      : props.history.location.state.editJob.price,
    proServices: props.history.location.state.typeCreate
      ? false
      : props.history.location.state.editJob.proServices,
    localSellers: props.history.location.state.typeCreate
      ? false
      : props.history.location.state.editJob.localSellers,
    onlineSellers: props.history.location.state.typeCreate
      ? false
      : props.history.location.state.editJob.onlineSellers,
    deliveryTime: props.history.location.state.typeCreate
      ? false
      : props.history.location.state.editJob.deliveryTime,
    type: props.history.location.state.typeCreate
      ? ""
      : props.history.location.state.editJob.type._id,
    subType: props.history.location.state.typeCreate
      ? ""
      : props.history.location.state.editJob.subType._id,
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name your job is required"),
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be greater than 0")
      .max(5, "Rating must be less than 5"),
    price: Yup.number()
      .required("Price is required")
      .min(1, "Price must be greater than 0")
      .max(2000, "Price must be less than 2000"),
    type: Yup.string().required("Type is required"),
    subType: Yup.string().required("Sub Type is required"),
  }),

  handleSubmit: (values, { props }) => {
    if (props.history.location.state.typeCreate) {
      clientApi
        .fetchAddJob(values, props.token)
        .then((result) => {
          alert("Add Job Success");
          props.history.goBack();
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      clientApi
        .fetchUpdateJob(props.match.params.id, values, props.token)
        .then((result) => {
          alert("Update Job Success");
          props.history.goBack();
        })
        .catch((err) => {
          alert(err);
        });
    }
  },

  displayName: "Login Fiverr",
})(AddJob);

const mapStateToProps = (state) => ({
  token: state.authReducer.currentUser?.token,
});

export default connect(mapStateToProps)(PostAJobWithFormik);
