import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import clientApi from "apis/clientApi";
import "./HomeNavigation.scss";
function HomeNavigation() {
  const [typeJobs, setTypeJobs] = useState({
    listTypeJobs: null,
    isLoading: true,
  });

  useEffect(() => {
    clientApi
      .fetchTypeJobs()
      .then((result) => {
        setTypeJobs({
          listTypeJobs: result.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const menu = (subTypeJobs) => {
    const listJobs = subTypeJobs.map((subJobs, idx) => {
      const { name, _id } = subJobs;
      return (
        <Menu.Item key={_id} className="border-r-2 border-gray-200 py-2">
          <Link
            to={{
              pathname: `/job-list/sub-job/${_id}`,
              state: { typeJob: false },
            }}
          >
            {name}
          </Link>
        </Menu.Item>
      );
    });
    if (listJobs.length === 0) {
      return "";
    }
    return (
      <Menu>
        <div className="grid lg:grid-cols-4 mm:grid-cols-2 md:grid-cols-3">
          {listJobs}
        </div>
      </Menu>
    );
  };

  if (typeJobs.isLoading) return <Skeleton />;
  return (
    <div className="border-b-2 border-gray-200 text-base">
      <ul className="list-none my-auto mx-auto text-center">
        {typeJobs.listTypeJobs.map((typeJob) => {
          const { name, _id, subTypeJobs } = typeJob;
          return (
            <li className="inline-block" key={_id}>
              <Dropdown overlay={menu(subTypeJobs)} className="lg:mx-4 mm:mr-1">
                <Link
                  className="ant-dropdown-link text-gray-700 hover:text-gray-700 mm:text-xs md:text-base lg:text-lg homenavigation"
                  to={`/job-categories/${_id}`}
                >
                  {name}
                </Link>
              </Dropdown>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default withRouter(HomeNavigation);
