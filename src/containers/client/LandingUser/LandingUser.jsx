import React, { useEffect, useState } from "react";
import adminApi from "apis/adminApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clientApi from "apis/clientApi";
import Loader from "components/Loader/Loader";
import "./LandingUser.scss";
import Slider from "react-slick";
import { HeartIcon, StarIcon } from "@heroicons/react/outline";
import Tag from "components/Tag/Tag";

export default function LandingUser(props) {
  const graphicDesignId = "61977cebaef344001cecee6c";
  const { idUser } = useSelector((state) => state.authReducer.currentUser);
  const [user, setUser] = useState({
    userDetail: null,
    isLoading: true,
  });
  const [ownerJob, setOwnerJob] = useState({
    userOnwerJob: null,
    isLoading: true,
  });
  const [allJob, setAllJob] = useState({
    allJob: null,
    isLoading: true,
  });
  const [designGraphic, setDesignGraphic] = useState({
    graphicDesign: null,
    isLoading: true,
  });
  const [like, setLike] = useState({
    mayLike: null,
    isLoading: true,
  });

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

  useEffect(() => {
    adminApi
      .fetchUserDetail(idUser)
      .then((result) => {
        setUser({
          userDetail: result.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });

    clientApi
      .fetchMainJobs(graphicDesignId)
      .then((result) => {
        setDesignGraphic({
          graphicDesign: result.data.splice(0, 15),
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
    adminApi
      .fetchUserInformation()
      .then((result) => {
        setOwnerJob({
          userOnwerJob: result.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [allJob.isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    clientApi
      .fetchItem()
      .then((result) => {
        let items = Array.from(result.data);
        let randomArr = [];
        let randomLike = [];
        for (let i = 0; i < 15; i++) {
          randomArr.push(items[Math.floor(Math.random() * items.length)]);
        }
        for (let index = 0; index <= 9; index++) {
          randomLike.push(items[Math.floor(Math.random() * items.length)]);
        }
        setAllJob({
          allJob: randomArr,
          isLoading: false,
        });
        setLike({
          mayLike: randomLike,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  if (
    user.isLoading ||
    allJob.isLoading ||
    designGraphic.isLoading ||
    like.isLoading
  )
    return <Loader />;
  return (
    <div className="lg:max-w-screen-2xl md:max-w-screen-md mx-auto">
      <div className="landing pt-8 pb-16 mx-auto">
        <div className="flex pb-14 h-60 mm:flex-col mm:gap-3 md:flex-row md:gap-0 ">
          <div className="landing_create mr-8 h-full">
            <div className="card h-full ml-2">
              <div className="card-body px-auto lg:px-5">
                <h4 className="card-title text-left mm:text-base">
                  Hi {user.userDetail.name},
                </h4>
                <p className="card-text lg:px-3 md:py-2 text-left">
                  Get offers from sellers for your project
                </p>
                <Link
                  to={{
                    pathname: `/post-a-job/${idUser}`,
                    state: { typeCreate: true },
                  }}
                  className="lg:py-2 lg:px-3 mm:py-1 mm:px-2 border-2 text-white border-green-500 bg-green-500 rounded-lg font-bold hover:bg-green-700 hover:border-green-700"
                >
                  Post a request
                </Link>
              </div>
            </div>
          </div>
          <div className="landing_slide h-full">
            <img
              src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/2566e7dd26a66537ef561b8400006cf4-1617800489936/banner%20background%20image.png"
              alt="background"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="landing__job">
          <div>
            <div className="flex justify-between">
              <h2 className="text-left ml-2">Browsing</h2>
              <Link
                to="/job-search/search=design"
                className="my-auto text-green-500 hover:text-green-700"
              >
                See All
              </Link>
            </div>
            <div className="landing__jobslider">
              <div className="lg:max-w-screen-2xl md:max-w-screen-md mx-auto">
                <div className="md:px-7 lg:px-0 mm:px-7">
                  <Slider {...settings}>
                    {allJob.allJob.map((job) => {
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
                      } = job;
                      return (
                        <div className="px-1 h-80 md:mb-0 mm:mb-10" key={_id}>
                          <div className="card text-left h-full border-gray-900">
                            <Link
                              to={{
                                pathname: `/job-detail/${_id}`,
                                state: { userCreated },
                              }}
                              className="text-black hover:text-green-600"
                            >
                              <img
                                src={
                                  image ? image : "https://picsum.photos/200"
                                }
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
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing__like mt-8">
          <div>
            <div className="flex justify-between">
              <h2 className="text-left ml-2">Gig you may like!!</h2>
            </div>
            <div className="landing__jobslider">
              <div className="mx-auto">
                <div className="grid lg:grid-cols-5 lg:px-0 md:gap-3 md:grid-cols-3 mm:grid-cols-1 mm:px-2 mm:gap-3">
                  {like.mayLike.map((job) => {
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
                    } = job;
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
              </div>
            </div>
          </div>
        </div>
        <div className="landing__design mt-8">
          <div>
            <div className="flex justify-between">
              <h2 className="text-left ml-2">
                See more in{" "}
                <span className="">
                  <Link
                    className="text-green-500 hover:text-green-700"
                    to="/job-categories/61977cebaef344001cecee6c"
                  >
                    Graphic & Design
                  </Link>
                </span>
              </h2>
              <Link
                to="/job-search/search=design "
                className="my-auto text-green-500 hover:text-green-700"
              >
                See All
              </Link>
            </div>
            <div className="landing__jobslider">
              <div className="md:max-w-screen-md lg:max-w-screen-2xl mx-auto">
                <div className="mm:px-7 lg:px-0">
                  <Slider {...settings}>
                    {designGraphic.graphicDesign.map((job) => {
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
                      } = job;
                      return (
                        <div className="px-1 h-80 md:mb-0 mm:mb-10" key={_id}>
                          <div className="card text-left h-full border-gray-900">
                            <Link
                              to={{
                                pathname: `/job-detail/${_id}`,
                                state: { userCreated },
                              }}
                              className="text-black hover:text-green-600"
                            >
                              <img
                                src={
                                  image ? image : "https://picsum.photos/200"
                                }
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
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
