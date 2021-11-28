import React, { useEffect, useState, memo } from "react";
import clientApi from "apis/clientApi";
import Loader from "components/Loader/Loader";
import {
  ChevronRightIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/outline";
import PageNotFound from "containers/shared/Auth/PageNotFound/PageNotFound";
import { Link } from "react-router-dom";
import Tag from "components/Tag/Tag";
import { Pagination } from "antd";
const numEachPage = 20;
function JobList(props) {
  let [jobList, setJobList] = useState({
    arrJobList: null,
    loading: true,
  });
  const [currentPage, setCurrentPage] = useState({
    minValue: 0,
    maxValue: 20,
    isChange: false,
  });
  useEffect(() => {
    const { id } = props.match.params;
    const { typeJobs } = props.location.state;
    if (typeJobs) {
      clientApi
        .fetchMainJobs(id)
        .then((result) => {
          setJobList({ arrJobList: result.data, loading: false });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      clientApi
        .fetchSubJobs(id)
        .then((result) => {
          setJobList({ arrJobList: result.data, loading: false });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [props.match.params.id, currentPage.minValue]);

  const handlePagination = (value) => {
    setCurrentPage({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
      isChange: true,
    });
  };

  const { nameJob, typeJobs } = props.location.state;
  const { id } = props.match.params;
  const { arrJobList } = jobList;
  if (jobList.loading) return <Loader />;
  if (arrJobList.length === 0) return <PageNotFound />;
  return (
    <div className="lg:max-w-screen-2xl md:max-w-screen-md mx-auto">
      <div className="joblist__content lg:py-10 md:py-16">
        <div className="my-5 text-left flex justify-start text-gray-400">
          <Link to="/" className="text-gray-400 hover:text-gray-600">
            FIVERR
          </Link>
          <div className="my-auto">
            <ChevronRightIcon className="w-4 h-4" />
          </div>
          {typeJobs ? (
            <div>
              <Link
                to={`/job-list/main-job/${id}`}
                className="text-gray-400 hover:text-gray-600"
              >
                {nameJob}
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to={`/job-list/main-job/${id}`}
                className="text-gray-400 hover:text-gray-600"
              >
                {nameJob}
              </Link>
            </div>
          )}
        </div>
        <h2 className="mm:text-base lg:text-2xl text-left">{nameJob}</h2>
        <div className="grid lg:grid-cols-5 mm:grid-cols-1 md:grid-cols-3 gap-4">
          {arrJobList &&
            arrJobList.length > 0 &&
            arrJobList
              .slice(currentPage.minValue, currentPage.maxValue)
              .map((list, idx) => {
                const {
                  name,
                  _id,
                  image,
                  price,
                  rating,
                  userCreated,
                  onlineSellers,
                  localSellers,
                  deliveryTime,
                  proServices,
                } = list;
                return (
                  <div className="h-80" key={_id}>
                    <div className="card text-left h-full border-gray-900">
                      <Link
                        to={{
                          pathname: `/job-detail/${_id}`,
                          state: { userCreated },
                        }}
                        className="text-black hover:text-green-600"
                      >
                        <img
                          src={image ? image : "https://picsum.photos/200"}
                          className="card-img-top w-full h-36"
                          alt={name}
                        />
                        <div className="card-body mb-0">
                          <p className="card-text text-base">{name}</p>
                          <div className="flex justify-between">
                            <div className="flex justify-start">
                              <StarIcon className="text-yellow-200 w-5 h-5" />{" "}
                              <span className="ml-1 text-yellow-200">
                                {rating}
                              </span>
                            </div>
                            <div className="flex justify-end">
                              <div>
                                <Tag
                                  allTag={{
                                    onlineSellers,
                                    localSellers,
                                    deliveryTime,
                                    proServices,
                                  }}
                                >
                                  {props.children}
                                </Tag>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer bg-transparent">
                          <small className="flex justify-between">
                            <span>
                              <HeartIcon className="w-4 h-4 hover:text-red-600" />
                            </span>
                            <span className="font-bold">
                              STARTING AT <span>US${price}</span>
                            </span>
                          </small>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="flex justify-end mt-4">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={numEachPage}
            onChange={handlePagination}
            total={arrJobList.length}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(JobList);
