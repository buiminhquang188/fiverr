import React, { useEffect, useState } from "react";
import Loader from "components/Loader/Loader";
import clientApi from "apis/clientApi";
import { Link, useParams } from "react-router-dom";
import { imgAllJob } from "./JobCategoriesConfig";

export default function JobCategories(props) {
  const params = useParams();
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
  }, [params.id]);

  if (loaing) return <Loader />;
  const { _id, subTypeJobs } = subJob.listSubJobs;
  const result = imgAllJob.filter((item) => item.id === _id);
  const imgSrcLength = result[0].imgJob.length;
  const newArrSubJob = subTypeJobs.map((subJob, idx) => ({
    ...subJob,
    imgSrc: idx < imgSrcLength ? result[0].imgJob[idx].imgSrc : null,
  }));

  return (
    <div className="container jobcategories">
      <h1 className="pt-8">{subJob.listSubJobs.name}</h1>
      <div className="row pt-8">
        <div className="col-3 text-left text-base">
          <Link
            to={{
              pathname: `/job-list/main-job/${subJob.listSubJobs._id}`,
              state: { typeJobs: true },
            }}
            className="text-black hover:text-black text-lg font-bold"
          >
            {subJob.listSubJobs.name}
          </Link>
          {subJob.listSubJobs.subTypeJobs.map((jobs) => {
            const { _id, name } = jobs;
            return (
              <ul className="list-none mt-2 text-lg">
                <li>
                  <Link
                    className="text-gray-500 hover:text-gray-900 hover:underline bg-transparent border-0 block"
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
                </li>
              </ul>
            );
          })}
        </div>
        <div className="col-9">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {newArrSubJob.map((jobs) => {
              const { name, _id, imgSrc } = jobs;
              return (
                <div className="col mb-4" key={_id}>
                  <Link
                    to={{
                      pathname: `/job-list/sub-job/${_id}`,
                      state: { typeJobs: false },
                    }}
                  >
                    <div className="card h-100 border-0">
                      <img
                        src={imgSrc}
                        className="card-img-top rounded-sm"
                        alt={name}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-left">{name}</h5>
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
