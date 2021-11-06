import React, { useState, useEffect } from "react";
import clientApi from "apis/clientApi";
import Loader from "components/Loader/Loader";
import { Rate } from "antd";
import Slider from "react-slick";

const settings2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function JobDetail(props) {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    customPaging: function (i) {
      console.log(i);
      return (
        <a>
          <img src={`https://picsum.photos/id/${i}/200/300`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    let detailJob = [];
    const { id } = props.match.params;
    clientApi
      .fetchItemById(id)
      .then((result) => {
        detailJob = result.data;
        setDetail(detailJob);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  if (loading) return <Loader />;
  console.log("render jobdetail");
  console.log(detail);
  return (
    <div className="w-full max-w-full">
      <div className="jobdetail__nav border-b-2 border-black">
        <ul className="flex">
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="#">
              Overview
            </a>
          </li>
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="#">
              Descriptions
            </a>
          </li>
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="#">
              About The Seller
            </a>
          </li>
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="#">
              Compare Packages
            </a>
          </li>
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="#">
              Recommendations
            </a>
          </li>
          <li className="mr-6">
            <a className="text-blue-500 hover:text-blue-800" href="#">
              Reviews
            </a>
          </li>
        </ul>
      </div>
      <div className="container jobdetail__contain py-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="jobdetail__left col-span-8">
            <div className="text-left">
              <div className="text-sm">Type Job {">"} Sub Type</div>
              <h3>Title</h3>
            </div>
            <div className="jobdetail__info">
              <div className="flex">
                <div className="w-12 h-12">
                  <img
                    src="https://picsum.photos/200/300"
                    alt="test"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="my-auto ml-2">Name author</div>
                <div className="my-auto ml-2">Level Seller</div>
                <div className="my-auto ml-2">
                  <Rate disabled defaultValue={4} />
                </div>
                <div className="text-gray-400 my-auto ml-2">Order in Queue</div>
              </div>
            </div>
            <div className="jobdetail__slick">
              <div>
                <Slider {...settings}>
                  <div>
                    <img
                      className="mx-auto"
                      src={`https://picsum.photos/id/0/200/300`}
                    />
                  </div>
                  <div>
                    <img
                      className="mx-auto"
                      src={`https://picsum.photos/id/1/200/300`}
                    />
                  </div>
                  <div>
                    <img
                      className="mx-auto"
                      src={`https://picsum.photos/id/2/200/300`}
                    />
                  </div>
                  <div>
                    <img
                      className="mx-auto"
                      src={`https://picsum.photos/id/3/200/300`}
                    />
                  </div>
                </Slider>
              </div>
            </div>
            <div className="jobdetail__review py-14">
              <div className="flex justify-between">
                <div className="">What people love about this seller</div>
                <div className="text-blue-400 cursor-pointer">
                  See all review
                </div>
              </div>
              <div className="jobdetail__reviewslick">
                <div>
                  <Slider {...settings2}>
                    <div>
                      <h3>Review 1</h3>
                    </div>
                    <div>
                      <h3>Review 2</h3>
                    </div>
                    <div>
                      <h3>Review 3</h3>
                    </div>
                    <div>
                      <h3>Review 4</h3>
                    </div>
                    <div>
                      <h3>Review 5</h3>
                    </div>
                    <div>
                      <h3>Review 6</h3>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          <div className="jobdetail__right col-span-4">
            <div className="fixed">
              <div className="text-left">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="pills-basic-tab"
                      data-toggle="pill"
                      href="#pills-basic"
                      role="tab"
                      aria-controls="pills-basic"
                      aria-selected="true"
                    >
                      Basic
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="pills-standard-tab"
                      data-toggle="pill"
                      href="#pills-standard"
                      role="tab"
                      aria-controls="pills-standard"
                      aria-selected="false"
                    >
                      Standard
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="pills-premium-tab"
                      data-toggle="pill"
                      href="#pills-premium"
                      role="tab"
                      aria-controls="pills-premium"
                      aria-selected="false"
                    >
                      Premium
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-basic"
                    role="tabpanel"
                    aria-labelledby="pills-basic-tab"
                  >
                    Basic
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-standard"
                    role="tabpanel"
                    aria-labelledby="pills-standard-tab"
                  >
                    Standard
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-premium"
                    role="tabpanel"
                    aria-labelledby="pills-premium-tab"
                  >
                    Premium
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
