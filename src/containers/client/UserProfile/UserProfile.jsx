import adminApi from "apis/adminApi";
import Loader from "components/Loader/Loader";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserHistory from "./UserHistory/UserHistory";
import UserInformation from "./UserInformation/UserInformation";

export default function UserProfile(props) {
  const location = useLocation();
  const { id } = location.state;
  const [user, setUser] = useState({
    userData: null,
    isLoading: true,
  });
  useEffect(() => {
    adminApi
      .fetchUserDetail(id)
      .then((result) => {
        setUser({
          userData: result.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  if (user.isLoading) return <Loader />;

  return (
    <div className="container">
      <div className="md:flex md:flex-row user mm:flex-col">
        <div className="user__left">
          <UserInformation
            userData={user.userData}
            userName={props.match.params}
          />
        </div>
        <div className="user__right md:flex-1 mm:flex-grow-0 mm:flex-shrink-0">
          <UserHistory userData={user.userData} />
        </div>
      </div>
    </div>
  );
}
