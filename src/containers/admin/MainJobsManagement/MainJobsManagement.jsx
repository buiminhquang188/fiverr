import React, { useEffect, useState } from "react";
import Loader from "components/Loader/Loader";
import { Table, Space, Button, Modal, Tag } from "antd";
import adminApi from "apis/adminApi";
import AddMainJobManagement from "./AddMainJobManagement/AddMainJobManagement";
import UpdateMainJobManagement from "./UpdateMainJobManagement/UpdateMainJobManagement";
import { useSelector } from "react-redux";

export default function MainJobsManagement() {
  const { token } = useSelector((state) => state.authReducer.currentUser);
  const [visibleAddMainJob, setVisibleAddMainJob] = useState(false);
  const [visibleUpdateMainJob, setVisibleUpdateMainJob] = useState(false);
  const [mainJob, setMainJob] = useState({
    mainJobList: [],
    loading: true,
  });

  const [tagSubJob, setTagSubJob] = useState({
    tagSubJobList: [],
    isLoading: true,
  });

  const [updateJob, setUpdateJob] = useState({
    updateJob: [],
    id: null,
  });

  const handleUpdateCb = () => {
    setVisibleUpdateMainJob(false);
  };

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
    adminApi
      .fetchSubJobsInformation()
      .then((result) => {
        setTagSubJob({
          tagSubJobList: result.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [visibleAddMainJob, visibleUpdateMainJob]);

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

  // fetch detail main job data
  const fetchDetailMainJob = (id) => {
    adminApi
      .fetchDetailMainJob(id)
      .then((result) => {
        setUpdateJob({
          updateJob: result.data,
          id: id,
        });
        setVisibleUpdateMainJob(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // remove main job
  const handleRemoveMainJob = (id) => {
    adminApi
      .fetchDeleteMainJob(id, token)
      .then((result) => {
        alert("Delete Main Job Successfully!");
        fetchMainJobData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const columns = [
    {
      title: "Name Main Job",
      dataIndex: "name",
      key: "name",
      render: (mainJob) => <div>{mainJob}</div>,
      width: 140,
    },
    {
      title: "Sub Job",
      dataIndex: "subjob",
      key: "subjob",
      render: (subJobBelong) => <div>{subJobBelong}</div>,
    },
    {
      title: "Amount Sub Job",
      dataIndex: "amountSubJobs",
      key: "amountSubJobs",
      width: 140,
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
            onClick={() => fetchDetailMainJob(values.key)}
          >
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
      return {
        key: _id,
        name,
        subjob:
          amountSubJobs !== 0 ? (
            subTypeJobs.map((subjob) => (
              <Tag className="ml-2 mb-2">{subjob.name}</Tag>
            ))
          ) : (
            <Tag className="ml-2 mb-2">No Sub Job</Tag>
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
        <Modal
          title="Update Main Job"
          centered
          visible={visibleUpdateMainJob}
          onOk={() => setVisibleUpdateMainJob(false)}
          onCancel={() => setVisibleUpdateMainJob(false)}
          width={1000}
        >
          <UpdateMainJobManagement
            updateMainJobData={updateJob.updateJob}
            allSubJobData={tagSubJob.tagSubJobList}
            jobId={updateJob.id}
            handleUpdateCb={handleUpdateCb}
          />
        </Modal>
      </div>
    )
  );
}
