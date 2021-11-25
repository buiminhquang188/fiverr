import React, { useState, useEffect } from "react";
import clientApi from "apis/clientApi";
import Loader from "components/Loader/Loader";
import { useSelector } from "react-redux";
import { Rate } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import JobDetailComment from "./JobDetailComment/JobDetailComment";
import adminApi from "apis/adminApi";
import Tag from "components/Tag/Tag";
import "./JobDetail.scss";

export default function JobDetail(props) {
  const history = useHistory();
  const params = useParams();
  const [detail, setDetail] = useState({
    detailJob: null,
    isLoading: true,
  });
  const [userCreated, setUserCreated] = useState({
    userCreated: null,
    isLoading: true,
  });
  const { token } = useSelector((state) => state.authReducer.currentUser);

  useEffect(() => {
    const { id } = params;
    const { userCreated } = history.location.state;
    clientApi
      .fetchDetailJobs(id)
      .then((result) => {
        setDetail({
          detailJob: result.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
    adminApi
      .fetchUserDetail(userCreated)
      .then((result) => {
        setUserCreated({
          userCreated: result.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleBooking = () => {
    clientApi
      .fetchBookingJob(props.match.params.id, token)
      .then((result) => {
        alert("Booking Job Complete!!");
      })
      .catch((err) => {
        alert(err);
      });
  };
  if (detail.isLoading || userCreated.isLoading) return <Loader />;
  console.log(userCreated.userCreated);
  console.log(detail.detailJob);
  const { onlineSellers, localSellers, deliveryTime, proServices, price } =
    detail.detailJob;
  return (
    <div className="w-full max-w-full">
      <div className="jobdetail__nav border-b-2 border-black">
        <ul className="flex">
          <li className="mr-6">
            <Link to="/" className="text-blue-500 hover:text-blue-800">
              Overview
            </Link>
          </li>
          <li className="mr-6">
            <Link to="/" className="text-blue-500 hover:text-blue-800">
              Descriptions
            </Link>
          </li>
          <li className="mr-6">
            <Link to="/" className="text-blue-500 hover:text-blue-800">
              About The Seller
            </Link>
          </li>
          <li className="mr-6">
            <Link to="/" className="text-blue-500 hover:text-blue-800">
              Compare Packages
            </Link>
          </li>
          <li className="mr-6">
            <Link to="/" className="text-blue-500 hover:text-blue-800">
              Recommendations
            </Link>
          </li>
          <li className="mr-6">
            <Link to="/" className="text-blue-500 hover:text-blue-800">
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <div className="jobdetail__contain mx-auto py-4 container">
        <div className="grid grid-cols-12 gap-16">
          <div className="jobdetail__left col-span-8">
            <div className="text-left">
              <div className="text-sm mb-2 flex justify-start">
                <Link to={`/job-categories/${detail.detailJob.type._id}`}>
                  {detail.detailJob.type.name}
                </Link>
                <div>
                  <ChevronRightIcon className="inline-block w-4 h-4" />
                </div>
                <Link
                  to={{
                    pathname: `/job-list/sub-job/${detail.detailJob.subType._id}`,
                    state: { typeJobs: false },
                  }}
                >
                  {detail.detailJob.subType.name}
                </Link>
              </div>
              <h3>{detail.detailJob.name}</h3>
            </div>
            <div className="jobdetail__info">
              <div className="flex">
                <div className="w-12 h-12">
                  <img
                    src={
                      userCreated.userCreated?.avatar
                        ? userCreated.userCreated.avatar
                        : `https://ui-avatars.com/api/?name=${userCreated.userCreated.email}`
                    }
                    alt={userCreated.userCreated.email}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="my-auto ml-2 font-bold">
                  {userCreated.userCreated.name
                    ? userCreated.userCreated.name
                    : userCreated.userCreated.email.substr(
                        0,
                        userCreated.userCreated.email.indexOf("@")
                      )}
                </div>
                <div className="ml-2 my-auto">
                  <Rate
                    disabled
                    defaultValue={4}
                    style={{ fontSize: 14 }}
                    className="py-auto"
                  />
                </div>
                <div className="my-auto ml-auto flex-shrink place-self-end items-center">
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
            <div className="jobdetail__slick my-3">
              <div className="w-full h-full">
                <img
                  src={
                    detail.detailJob.image
                      ? detail.detailJob.image
                      : "https://picsum.photos/450/430"
                  }
                  alt="img job"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="jobdetail__about">
              <div className="jobdetail__review">
                <div className="jobdetail__rating"></div>
                <JobDetailComment />
              </div>
            </div>
          </div>
          <div className="jobdetail__right col-span-4">
            <div className="w-full border-l-2 border-r-2 border-b-2 my-4">
              <div className="flex pb-2 justify-around border-t-2 border-b-2">
                <div className="bg-white text-lg font-semibold text-green-500 py-2 px-2">
                  Basic
                </div>
              </div>
              <div className="flex justify-between text-lg py-4 px-3">
                <div className="font-bold">Basic</div>
                <div>US${price}</div>
              </div>
              <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded w-full"
                onClick={handleBooking}
              >
                Continue (US${price})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
