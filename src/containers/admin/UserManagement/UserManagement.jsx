import React, { useState, useEffect } from "react";
import Loader from "components/Loader/Loader";
import { Table, Space, Button, Modal, Input } from "antd";
import { useSelector } from "react-redux";
import adminApi from "apis/adminApi";
import AddUserManagement from "./AddUserManagement/AddUserManagement";
import UpdateUserManagement from "./UpdateUserManagement/UpdateUserManagement";
const { Search } = Input;

export default function UserManagement() {
  const [user, setUser] = useState({
    userList: null,
    loading: true,
  });
  const { token } = useSelector((state) => state.authReducer.currentUser);

  const [visible, setVisibleUpdateUser] = useState(false);
  const [visibleAddUser, setVisibleAddUser] = useState(false);

  useEffect(() => {
    adminApi
      .fetchUserInformation()
      .then((result) => {
        setUser({
          userList: result.data,
          loading: false,
        });
      })
      .catch((err) => {});
  }, [visible, visibleAddUser]);

  const [update, setUpdate] = useState({
    userNeedUpdate: null,
    isUpdate: false,
  });

  //  updateVisible
  const updateVisible = () => {
    setVisibleUpdateUser(false);
  };

  // fetch User Data
  const fetchUserData = () => {
    adminApi
      .fetchUserInformation()
      .then((result) => {
        setUser({
          userList: result.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  // fetch Detail Data User
  const fetchDetailUserData = (id) => {
    adminApi
      .fetchUserDetail(id)
      .then((result) => {
        setUpdate({
          userNeedUpdate: result.data,
          isUpdate: true,
        });
        setVisibleUpdateUser(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // remove user
  const handleRemoveUser = (id) => {
    adminApi
      .fetchDeleteUser(id, token)
      .then((result) => {
        alert("Xóa thành công");
        fetchUserData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  // fetch api again when modal add user close & open
  useEffect(() => {
    fetchUserData();
  }, [visibleAddUser]);

  const columns = [
    {
      title: "#",
      dataIndex: "indexNumber",
      key: "indexNumber",
      render: (index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Phone",
      dataIndex: "userPhone",
      key: "userPhone",
    },
    {
      title: "Gender",
      dataIndex: "userGender",
      key: "userGender",
    },
    {
      title: "Role",
      dataIndex: "userRole",
      key: "userRole",
    },
    {
      title: "Action",
      key: "action",
      render: (values) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              fetchDetailUserData(values.id);
            }}
          >
            Update
          </Button>
          <Button
            type="danger"
            onClick={() => {
              handleRemoveUser(values.id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const userData = (userList) => {
    return userList.map((user, idx) => {
      const { name, phone, role, email, gender, _id } = user;
      return {
        key: idx,
        indexNumber: idx,
        id: _id,
        userName: name ? name : "User don't have name",
        userEmail: email,
        userPhone: phone,
        userGender: gender ? "Male" : "Female",
        userRole: role,
      };
    });
  };

  // search user
  const onSearch = (e) => {
    e.preventDefault();
    adminApi
      .fetchFindUser(e.target.value)
      .then((result) => {
        setUser({
          userList: result.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (user.loading) return <Loader />;
  return (
    user.userList && (
      <div className='w-full h-full'>
        <div className="flex pb-3">
          <Button type="primary" onClick={() => setVisibleAddUser(true)}>
            Add User
          </Button>
        </div>
        <Modal
          title="Add User"
          centered
          visible={visibleAddUser}
          width={1000}
          footer={[
            <Button key="back" onClick={() => setVisibleAddUser(false)}>
              Return
            </Button>,
          ]}
        >
          <AddUserManagement />
        </Modal>
        <Search
          placeholder="Search user by name & email"
          onChange={(e) => onSearch(e)}
          enterButton
          className="w-full pb-2"
        />
        <Table
          columns={columns}
          dataSource={userData(user.userList)}
          className="overflow-x-auto"
        />
        {update.isUpdate && (
          <Modal
            centered
            visible={visible}
            width={1000}
            footer={[
              <Button key="back" onClick={() => setVisibleUpdateUser(false)}>
                Return
              </Button>,
            ]}
          >
            <UpdateUserManagement
              userNeedUpdate={update.userNeedUpdate}
              updateVisible={updateVisible}
            />
          </Modal>
        )}
      </div>
    )
  );
}
