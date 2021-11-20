import React, { useEffect, useState } from "react";
import Loader from "components/Loader/Loader";
import { Table, Space, Button, Modal, Tag } from "antd";
import adminApi from "apis/adminApi";
import AddMainJobManagement from "./AddMainJobManagement/AddMainJobManagement";

export default function MainJobsManagement() {
  const [visibleAddMainJob, setVisibleAddMainJob] = useState(false);
  const [mainJob, setMainJob] = useState({
    mainJobList: [],
    loading: true,
  });

  useEffect(() => {
    adminApi
      .fetchMainJobsInformation()
      .then((result) => {
        setMainJob({
          mainJobList: result.data,
          loading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [visibleAddMainJob]);

  // fetch main job data
  const fetchMainJobData = () => {
    adminApi
      .fetchMainJobsInformation()
      .then((result) => {
        setMainJob({
          mainJobList: result.data,
          loading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  // remove main job
  const handleRemoveMainJob = (id) => {
    adminApi
      .fetchDeleteMainJob(id)
      .then((result) => {
        console.log(result);
        alert("Delete Main Job Successfully!");
        fetchMainJobData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("Render MainJobsManagement");
  const columns = [
    {
      title: "Name Main Job",
      dataIndex: "name",
      key: "name",
      render: (mainJob) => <div>{mainJob}</div>,
      width: "20%",
    },
    {
      title: "Sub Job",
      dataIndex: "subjob",
      key: "subjob",
      render: (subJobBelong) => <div>{subJobBelong}</div>,
    },
    {
      title: "Amount Sub Jobs",
      dataIndex: "amountSubJobs",
      key: "amountSubJobs",
    },
    {
      title: "Status",
      dataIndex: "statusJobs",
      key: "statusJobs",
    },
    {
      title: "Action",
      key: "action",
      render: (values) => (
        <Space size="middle">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block">
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block"
            onClick={() => handleRemoveMainJob(values.key)}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const mainJobsData = () => {
    return mainJob.mainJobList.map((mainjob, idx) => {
      const { name, subTypeJobs, status, _id } = mainjob;
      const amountSubJobs = subTypeJobs.length;
      console.log(subTypeJobs);
      return {
        key: _id,
        name,
        subjob: subTypeJobs.map((subjob) =>
          subjob.name !== "" ? (
            <Tag className="ml-2 mb-2">{subjob.name}</Tag>
          ) : (
            "No Job Found"
          )
        ),
        amountSubJobs: amountSubJobs ? amountSubJobs : "0",
        statusJobs: status ? "Active" : "Disable",
      };
    });
  };
  if (mainJob.loading) return <Loader />;
  return (
    mainJob.mainJobList && (
      <div>
        <div className="flex pb-3">
          <Button type="primary" onClick={() => setVisibleAddMainJob(true)}>
            Add Main Job
          </Button>
        </div>
        <Modal
          title="Add Main Job"
          centered
          visible={visibleAddMainJob}
          onOk={() => setVisibleAddMainJob(false)}
          onCancel={() => setVisibleAddMainJob(false)}
          width={1000}
        >
          <AddMainJobManagement />
        </Modal>
        <Table columns={columns} dataSource={mainJobsData()} bordered={true} />
      </div>
    )
  );
}
