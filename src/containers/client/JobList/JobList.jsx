import React, { useEffect } from "react";
import clientApi from "apis/clientApi";
import { useState } from "react";
import Loader from "components/Loader/Loader";
import { Rate } from "antd";
import { HeartIcon } from "@heroicons/react/solid";
export default function JobList() {
  let [jobList, setJobList] = useState({ loading: true });

  useEffect(() => {
    clientApi
      .fetchItem()
      .then((result) => {
        let arrJobList = [];
        arrJobList = result.data;
        setJobList({ arrJobList, loading: false });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const { arrJobList } = jobList;
  if (jobList.loading) return <Loader />;

  return (
    <div className="container-fluid">
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
            console.log(list);
            const { name, rating, price } = list;
            return (
              <div className="col mb-4">
                <div className="card h-100">
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                      <div className="text-left">
                        <Rate disabled defaultValue={2} />
                      </div>
                    </p>
                  </div>
                  <div class="card-footer">
                    <small class="">
                      <span>
                        <HeartIcon className='w-7 h-auto'/>
                      </span>
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
