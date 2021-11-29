import React, { useState, useEffect, useRef } from "react";
import { Spin, Rate } from "antd";
import clientApi from "apis/clientApi";
import { Link } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import "./UserHistory.scss";

export default function UserHistory(props) {
  const { token } = useSelector((state) => state.authReducer.currentUser);
  const { userData } = props;
  const [jobData, setJobData] = useState({
    jobData: [],
    isLoading: 1,
  });
  const [listJob, setListJob] = useState({
    listJob: [],
    isLoading: true,
  });
  const [imgId, setImgId] = useState({
    id: null,
    imgSrc: null,
    isDone: false,
  });
  const inputImage = useRef(null);
  let arrJob = [];
  useEffect(() => {
    for (let i = 0; i < userData.bookingJob.length; i++) {
      clientApi
        .fetchDetailJobs(userData.bookingJob[i])
        .then((result) => {
          arrJob.push(result.data);
          setJobData({
            jobData: arrJob,
            isLoading: ++jobData.isLoading,
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []);

  useEffect(() => {
    clientApi
      .fetchItem()
      .then((result) => {
        const filterJob = result.data.filter(
          (job) => job.userCreated === userData._id
        );
        setListJob({
          listJob: filterJob,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [imgId.isDone]);

  const handleRemoveJob = (id) => {
    clientApi
      .fetchDeleteJob(id)
      .then((result) => {
        alert("Delete Job Success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleImage = (_id) => {
    inputImage.current.click();
    setImgId({
      id: _id,
    });
  };

  const handleUpload = (e, id) => {
    if (window.FileReader) {
      const image = inputImage.current.files[0];
      let reader = new FileReader();
      if (image && image.type.match("image.*")) {
        reader.readAsDataURL(image);
        let formData = new FormData();
        reader.onload = (e) => {
          setImgId({
            id: imgId.id,
            imgSrc: e.target.result,
            isDone: true,
          });
        };
        formData.append("job", image, image.name);
        clientApi
          .fetchUpdateImageJob(imgId.id, formData, token)
          .then((result) => {
            alert("Update Image Job Success");
            setImgId({
              isDone: false,
            });
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        return;
      }
    }
  };

  if (jobData.isLoading && listJob.isLoading)
    return <Spin className="max-h-screen h-screen flex align-middle my-au" />;
  return (
    <div className="lg:ml-20 md:ml-10 flex flex-col userhistory">
      <div className="userhistory__services mt-11 mb-6">
        <div className="border-black pt-4 pl-8 pr-4 pb-6 border-2 border-opacity-50">
          <div className="flex">
            <div className="">
              <img
                src="https://npm-assets.fiverrcdn.com/assets/@fiverr-private/business_blocks/office-building.7ac5061.gif"
                alt="Office Building"
              />
            </div>
            <div className="text-left ml-2 text-sm">
              <div className="font-bold text-xl mb-2">
                Buying services for work?{" "}
                <span className="font-normal">
                  Get the best experience for your business with 3 quick
                  questions.
                </span>
              </div>
              <div className="cursor-pointer text-green-500">
                What's your industry
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="userhistory__gig">
        {listJob.listJob.length > 0 ? (
          <div className="text-right">
            <h3 className="">Job Created</h3>
            <Link
              to={{
                pathname: `/post-a-job/${userData._id}`,
                state: { typeCreate: true },
              }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create a New Gig
            </Link>
            {listJob.listJob.map((job) => {
              const { name, image, rating, _id, userCreated } = job;
              return (
                <div className="border-gray-500 pr-4 border-t-2 mt-3 mb-6 border-opacity-50">
                  <div className="flex justify-start mm:flex-col md:flex-row md:items-center lg:flex-row">
                    <div className="w-28 h-28 mm:w-full px-2 py-2 flex-1">
                      <div
                        className="userhistory__imgwrapper relative cursor-pointer h-full w-full"
                        onClick={() => handleImage(_id)}
                      >
                        <img
                          src={image ? image : "https://picsum.photos/200/100"}
                          alt={name}
                          className="w-full h-full object-cover z-10"
                        />
                        <input
                          type="file"
                          name={_id}
                          id={_id}
                          key={_id}
                          accept="image/*"
                          className="visible hidden"
                          ref={inputImage}
                          onChange={(e) => handleUpload(e, _id)}
                        />
                        <CameraIcon className="w-full h-full absolute top-0 userhistory__update" />
                      </div>
                    </div>
                    <div className="my-auto text-left flex-1">
                      <div className="font-bold">{name}</div>
                      <div>Lorem ipsum dolor sit amet.</div>
                      <Rate value={rating} disabled />
                    </div>
                    <div className="flex-0 align-bottom self-end mb-2">
                      <div className="flex justify-between">
                        <Link
                          to={{
                            pathname: `/job-detail/${_id}`,
                            state: { userCreated },
                          }}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-0 px-2 rounded"
                        >
                          View Detail
                        </Link>
                        <Link
                          to={{
                            pathname: `/edit-a-job/${_id}`,
                            state: { typeCreate: false, editJob: job },
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded mr-1 ml-1"
                        >
                          Edit
                        </Link>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded"
                          onClick={() => handleRemoveJob(_id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-gray-500 pt-4 pl-8 pr-4 pb-6 border-2 border-opacity-50">
            <div className="flex justify-between">
              <div className="my-auto">
                It seems that you don't have any active Gigs. Get selling!
              </div>
              <Link
                to={{
                  pathname: `/post-a-job/${userData._id}`,
                  state: { typeCreate: true },
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Create a New Gig
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="userhistory__list">
        {jobData.jobData.length > 0 ? (
          <div>
            <h3 className="text-right">Job Order</h3>
            {jobData.jobData.map((job) => {
              const { name, _id, rating, image, userCreated } = job;
              return (
                <div className="mt-6" key={_id}>
                  <div className="border-gray-500 pr-4 border-t-2 border-opacity-50">
                    <div className="flex justify-start">
                      <div className="w-28 h-28 px-2 py-2 flex-1">
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="my-auto text-left flex-1">
                        <div className="font-bold">{name}</div>
                        <div>Lorem ipsum dolor sit amet.</div>
                        <Rate value={rating} disabled />
                      </div>
                      <div className="flex justify-between">
                        <div className="flex-1 align-bottom self-end mb-2">
                          <Link
                            to={{
                              pathname: `/job-detail/${_id}`,
                              state: { userCreated },
                            }}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-0  rounded mr-2"
                          >
                            View Detail
                          </Link>
                          {userData._id === _id ? (
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded mr-2">
                              Edit
                            </button>
                          ) : (
                            ""
                          )}
                          {userData._id === _id ? (
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded mr-2">
                              X
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-gray-500 pt-4 pl-8 pr-4 pb-6 border-2 border-opacity-50 mt-6">
            <div className="flex justify-between">
              <div className="my-auto">
                It seems that you don't have any booking any job. Get order now!
              </div>
              <Link
                to="/"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                See order
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
