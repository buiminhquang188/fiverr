import React, { useEffect, useState, memo } from "react";
import clientApi from "apis/clientApi";
import Loader from "components/Loader/Loader";
import { Rate } from "antd";
import { HeartIcon } from "@heroicons/react/solid";
import PageNotFound from "containers/shared/Auth/PageNotFound/PageNotFound";
import { Link } from "react-router-dom";

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
    <div className="container">
      <div className="joblist__top">
        <div className="joblist__forms w-1/2">
          <select className="form-control">
            <option>Default select</option>
          </select>
        </div>
      </div>
      <div className="joblist__content py-32">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
          {arrJobList.map((list, idx) => {
            const { name, rating, _id } = list;
            const numberRating = rating / 2;
            return (
              <div className="col mb-4">
                <Link to={`/job-detail/${_id}`}>
                  <div className="card h-100">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                        <div className="text-left">
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={numberRating}
                          />
                        </div>
                      </p>
                    </div>
                    <div class="card-footer">
                      <small class="">
                        <span>
                          <HeartIcon className="w-7 h-auto" />
                        </span>
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(JobList);
