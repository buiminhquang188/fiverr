import React, { useEffect, useState, memo } from "react";
import clientApi from "apis/clientApi";
import Loader from "components/Loader/Loader";
import { HeartIcon, StarIcon } from "@heroicons/react/solid";
import PageNotFound from "containers/shared/Auth/PageNotFound/PageNotFound";
import { Link } from "react-router-dom";
import Tag from "components/Tag/Tag";

function JobList(props) {
  let [jobList, setJobList] = useState({ loading: true });
  useEffect(() => {
    const { id } = props.match.params;
    const { typeJobs } = props.location.state;
    if (typeJobs) {
      clientApi
        .fetchMainJobs(id)
        .then((result) => {
          let arrJobList = [];
          arrJobList = result.data;
          setJobList({ arrJobList, loading: false });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      clientApi
        .fetchSubJobs(id)
        .then((result) => {
          let arrJobList = [];
          arrJobList = result.data;
          setJobList({ arrJobList, loading: false });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [props.match.params.id]);

  const { arrJobList } = jobList;
  if (jobList.loading) return <Loader />;
  if (arrJobList.length === 0) return <PageNotFound />;
  return (
    <div className="container-fluid">
      <div className="joblist__top">
        <div className="joblist__forms w-1/2">
          <select className="form-control">
            <option>Default select</option>
          </select>
        </div>
      </div>
      <div className="joblist__content py-32 mx-32">
        <div className="grid grid-cols-4 gap-4">
          {arrJobList.map((list, idx) => {
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
              <div key={_id}>
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
                      className="card-img-top w-full h-40"
                      alt={name}
                    />
                    <div className="card-body mb-0">
                      <p className="card-text text-base">{name}</p>
                      <div className="flex justify-between">
                        <div className="flex justify-start">
                          <StarIcon className="text-yellow-200 w-5 h-5" />{" "}
                          <span className="ml-1 text-yellow-200">{rating}</span>
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
                      <small class="flex justify-between">
                        <div>
                          <span>
                            <HeartIcon className="w-4 h-4 hover:text-red-600" />
                          </span>
                        </div>
                        <div>
                          <span>
                            STARTING AT <span>US${price}</span>
                          </span>
                        </div>
                      </small>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(JobList);
