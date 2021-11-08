import React, { useEffect, useState } from "react";
import Loader from "components/Loader/Loader";
import clientApi from "apis/clientApi";
import { Link } from "react-router-dom";

export default function JobCategories(props) {
  let [subJob, setSubJob] = useState([]);
  let [loaing, setLoading] = useState(true);

  useEffect(() => {
    const { id } = props.match.params;
    clientApi
      .fetchSubTypeJobs(id)
      .then((result) => {
        let listSubJobs = result.data;
        setSubJob({ listSubJobs });
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, [props.match.params]);

  if (loaing) return <Loader />;
  console.log("render JobCategories");
  return (
    <div className="container jobcategories py-32">
      <h1>{subJob.listSubJobs.name}</h1>
      <div className="row">
        <div className="col-3">
          <Link
            to={{
              pathname: `/job-list/main-job/${subJob.listSubJobs._id}`,
              state: { typeJobs: true },
            }}
            className="nav-link"
          >
            {subJob.listSubJobs.name}
          </Link>
          {subJob.listSubJobs.subTypeJobs.map((jobs) => {
            const { _id, name } = jobs;
            return (
              <Link
                className="nav-link"
                to={{
                  pathname: `/job-list/sub-job/${_id}`,
                  state: { typeJobs: false },
                }}
                state={{
                  from: "hello",
                }}
                key={_id}
              >
                {name}
              </Link>
            );
          })}
        </div>
        <div className="col-9">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {subJob.listSubJobs.subTypeJobs.map((jobs) => {
              const { name, _id } = jobs;
              return (
                <div className="col mb-4" key={_id}>
                  <Link
                    to={{
                      pathname: `/job-list/sub-job/${_id}`,
                      state: { typeJobs: true },
                    }}
                  >
                    <div className="card">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
