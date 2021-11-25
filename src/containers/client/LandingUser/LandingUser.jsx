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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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
      .fetchItem()
      .then((result) => {
        setAllJob({
          allJob: result.data.splice(0, 15),
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
  }, []);

  if (user.isLoading || allJob.isLoading) return <Loader />;
  // const results = allJob.allJob
  //   .filter(({ userCreated: idUserCreated }) =>
  //     ownerJob.userOnwerJob.some(({ _id: idUser }) => idUser === idUserCreated)
  //   )
  //   .map((item) => {
  //     console.log(item);
  //   });

  // // console.log(results);
  return (
    <div className="container-fluid">
      <div className="landing pt-8 pb-16 mx-auto">
        <div className="flex pb-14">
          <div className="landing_create mr-8">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Hi {user.userDetail.name},</h4>
                <p className="card-text">
                  Get offers from sellers for your project
                </p>
                <Link
                  to={{
                    pathname: `/post-a-job/${idUser}`,
                    state: { typeCreate: true },
                  }}
                  className="py-2 px-3 border-2 text-green-500 border-green-500 rounded-lg"
                >
                  Post a request
                </Link>
              </div>
            </div>
          </div>
          <div className="landing_slide h-60">
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
              <h2 className="text-left">Browsing</h2>
              <Link to="/job-search/search= " className="my-auto">
                See All
              </Link>
            </div>
            <div className="landing__jobslider">
              <div className="md:max-w-7xl mx-auto">
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
                      <div className="px-1" key={_id}>
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
                              <small class="flex justify-between mt-3">
                                <span>
                                  <HeartIcon className="w-4 h-4 hover:text-red-600" />
                                </span>
                                <span>
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
  );
}
