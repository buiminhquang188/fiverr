import React, { useState, useEffect } from "react";
import Loader from "components/Loader/Loader";
import { Table, Space, Modal, Button, Tag } from "antd";
import adminApi from "apis/adminApi";
import AddSubJobManagement from "./AddSubJobManagement/AddSubJobManagement";
import { useSelector } from "react-redux";

export default function SubJobsManagement() {
  const { token } = useSelector((state) => state.authReducer.currentUser);
  const [visibleAddSubJob, setVisibleAddSubJob] = useState(false);
  const [visibleUpdateSubJob, setVisibleUpdateSubJob] = useState(false);
  const [subJob, setSubJob] = useState({
    subJobList: [],
    loading: true,
  });
  const [updateJob, setUpdateJob] = useState({
    updateJob: [],
    loading: true,
  });

  const handleUpdateCb = () => {
    setVisibleUpdateSubJob(false);
  };
  useEffect(() => {
    adminApi
      .fetchSubJobsInformation()
      .then((result) => {
        setSubJob({
          subJobList: result.data,
          loading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [visibleAddSubJob, visibleUpdateSubJob]);

  // fetch sub job data
  const fetchSubJobsData = () => {
    adminApi
      .fetchSubJobsInformation()
      .then((result) => {
        setSubJob({
          subJobList: result.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  // fetch detail sub job data
  const fetchDetailSubJob = (id) => {
    adminApi
      .fetchSubJobDetail(id)
      .then((result) => {
        setUpdateJob({
          updateJob: result.data,
        });
        setVisibleUpdateSubJob(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // handle remove sub job
  const handleRemoveSubJob = (id) => {
    adminApi
      .fetchDeleteSubJob(id, token)
      .then((result) => {
        alert("Delete Sub Job Successfully");
        fetchSubJobsData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const columns = [
    {
      title: "Name Sub Job",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Belong to Main Job",
      dataIndex: "mainjob",
      key: "mainjob",
      render: (text) => <Space>{text}</Space>,
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block"
            onClick={() => fetchDetailSubJob(values.key)}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block"
            onClick={() => handleRemoveSubJob(values.key)}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];
  const subJobsData = () => {
    return subJob.subJobList.map((subJob, idx) => {
      const { name, status, _id, typeJob } = subJob;
      return {
        key: _id,
        name,
        mainjob: typeJob?.name ? (
          <Tag>{typeJob.name}</Tag>
        ) : (
          <Tag>No Job Found</Tag>
        ),
        statusJobs: status ? "Active" : "Disable",
      };
    });
  };
  if (subJob.loading) return <Loader />;
  return (
    subJob.subJobList && (
      <div>
        <div className="flex pb-3">
          <Button type="primary" onClick={() => setVisibleAddSubJob(true)}>
            Add Sub Job
          </Button>
        </div>
        <Modal
          title="Add Sub Job"
          centered
          visible={visibleAddSubJob}
          onOk={() => setVisibleAddSubJob(false)}
          onCancel={() => setVisibleAddSubJob(false)}
          width={1000}
        >
          <AddSubJobManagement checkType={true} />
        </Modal>
        <Table columns={columns} dataSource={subJobsData()} className='overflow-x-auto' />
        <Modal
          title="Update Sub Job"
          centered
          visible={visibleUpdateSubJob}
          onOk={() => setVisibleUpdateSubJob(false)}
          onCancel={() => setVisibleUpdateSubJob(false)}
          width={1000}
        >
          <AddSubJobManagement
            checkType={false}
            updateSubJobData={updateJob.updateJob}
            handleUpdateCb={handleUpdateCb}
          />
        </Modal>
      </div>
    )
  );
}
