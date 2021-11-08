import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";

export default function HomeNavigation(props) {
  return (
    <div>
      <ul className="list-none my-auto mx-auto">
        {props.listTypeJobs.map((typeJob) => {
          const { name, _id, subTypeJobs } = typeJob;
          console.log(typeJob);
          return (
            <Dropdown overlay={menu(subTypeJobs)} className="ml-2" key={_id}>
              <Link className="ant-dropdown-link" to={`/job-categories/${_id}`}>
                {name}
              </Link>
            </Dropdown>
          );
        })}
      </ul>
    </div>
  );
}

const menu = (subTypeJobs) => {
  const listJobs = subTypeJobs.map((subJobs) => {
    const { name, _id } = subJobs;
    return (
      <Menu.Item>
        <Link to={`/job-list/sub-job/${_id}`}>{name}</Link>
      </Menu.Item>
    );
  });
  if (listJobs.length === 0) {
    return "";
  }
  return <Menu>{listJobs}</Menu>;
};
