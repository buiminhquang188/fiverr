import React from "react";
import UserHistory from "./UserHistory/UserHistory";
import UserInformation from "./UserInformation/UserInformation";

export default function UserProfile() {
  return (
    <div className="container">
      <div className="flex user">
        <div className="user__left">
          <UserInformation />
        </div>
        <div className="user__right flex-1">
          <UserHistory />
        </div>
      </div>
    </div>
  );
}
