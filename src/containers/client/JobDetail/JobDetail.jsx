import React, { useState, useEffect } from "react";
import Slider from "react-slick";
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
import { HeartIcon, StarIcon } from "@heroicons/react/outline";

export default function JobDetail(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrow: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: false,
        },
      },
    ],
  };
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
  const [userBrowsing, setUserBrowsing] = useState({
    userBrowsing: null,
    isLoading: true,
  });
  const { currentUser } = useSelector((state) => state.authReducer);

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
    clientApi
      .fetchItem()
      .then((result) => {
        let items = Array.from(result.data);
        let randomArr = [];
        for (let i = 0; i < 15; i++) {
          randomArr.push(items[Math.floor(Math.random() * items.length)]);
        }
        setUserBrowsing({
          userBrowsing: randomArr,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleBooking = () => {
    if (currentUser) {
      const { token } = currentUser;
      clientApi
        .fetchBookingJob(props.match.params.id, token)
        .then((result) => {
          alert("Booking Job Complete!!");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Please Login First!!");
      history.push("/login");
    }
  };
  if (detail.isLoading || userCreated.isLoading || userBrowsing.isLoading)
    return <Loader />;
  const {
    onlineSellers,
    localSellers,
    deliveryTime,
    proServices,
    price,
    rating,
  } = detail.detailJob;
  return (
    <div className="lg:max-w-screen-2xl mm:max-w-screen-mm md:max-w-screen-md mx-auto md:px-6 lg:px-0">
      <div className="jobdetail__contain mx-auto py-4">
        <div className="grid md:grid-cols-12 mm:grid-cols-1 gap-16">
          <div className="jobdetail__left md:col-span-8">
            <div className="text-left">
              <div className="text-sm mb-2 flex justify-start">
                <Link
                  className="text-green-400 hover:text-green-700"
                  to={`/job-categories/${detail.detailJob.type._id}`}
                >
                  {detail.detailJob.type.name}
                </Link>
                <div>
                  <ChevronRightIcon className="inline-block w-4 h-4 mb-1" />
                </div>
                <Link
                  className="text-green-400 hover:text-green-700"
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
                    defaultValue={rating}
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
                <JobDetailComment idJob={props.match.params.id} />
              </div>
            </div>
          </div>
          <div className="jobdetail__right md:col-span-4 relative">
            <div className="w-full border-l-2 border-r-2 border-b-2 my-4 sticky top-0">
              <div className="flex pb-2 justify-around border-t-2 border-b-2">
                <div className="bg-white text-lg font-semibold text-green-500 py-2 px-2">
                  Basic
                </div>
              </div>
              <div className="flex justify-between text-lg py-4 px-3">
                <div className="font-bold">Basic</div>
                <div>US${price}</div>
              </div>
              <div className="w-full px-2 pb-1">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold lg:py-2 lg:px-8 rounded w-full md:py-2 md:px-4"
                  onClick={handleBooking}
                >
                  Continue (US${price})
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="jobdetail__browsing py-12">
          <h2 className="text-left">Find more job</h2>
          <div className="mm:px-3 md:px-0">
            <Slider {...settings}>
              {userBrowsing.userBrowsing.map((browsing) => {
                const {
                  _id,
                  rating,
                  name,
                  image,
                  price,
                  userCreated,
                  onlineSellers,
                  localSellers,
                  deliveryTime,
                  proServices,
                } = browsing;
                return (
                  <div className="px-1 md:mb-0 mm:mb-10" key={_id}>
                    <div className="card text-left h-100 border-gray-900">
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
                          <small className="flex justify-between mt-auto">
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
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
