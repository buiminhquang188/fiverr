import React, { memo } from "react";
import { fiverrBanner, fiverrTrusted } from "./HomeBannerConfig";
import Slider from "react-slick";
import Search from "antd/lib/input/Search";
import { SearchIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router";
import "./HomeBanner.scss";

const settings = {
  arrows: false,
  infinite: true,
  fade: true,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
};

const prefixIcons = <SearchIcon width="20px" />;

function HomeBanner(props) {
  const history = useHistory();
  const onSearch = (searchValue) => {
    history.push(`job-search/search=${searchValue}`);
  };
  return (
    <div className="banner">
      <div className="banner__wrapper relative">
        <Slider {...settings}>
          {fiverrBanner.map((banner) => {
            const { imgSrc, name, job } = banner;
            return (
              <div className="banner__img relative" key={name}>
                <img src={imgSrc} alt={name} className="w-full object-cover" />
                <div className="banner__info absolute z-10 bottom-0 right-0 lg:p-5 mm:mr-2">
                  <h5 className="text-white mm:text-xs sm:text-sm md:text-xs lg:text-lg">
                    {name}, {job}
                  </h5>
                </div>
              </div>
            );
          })}
        </Slider>
        <div className="banner__content absolute lg:top-1/4 lg:left-16 h-full max-w-2xl mm:top-5 mm:left-0 md:top-20 md:m-5">
          <div>
            <h1 className="text-left mm:text-xs sm:text-sm md:text-lg lg:text-5xl text-white">
              Find the perfect <span className="italic">freelance</span>{" "}
              services for your business
            </h1>
            <div className="mm:w-52 md:w-full lg:w-full lg:h-full">
              <Search
                placeholder="Try search something"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                prefix={prefixIcons}
                className="banner__search"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="banner__trust bg-gray-50">
        <div className="flex max-w-4xl mx-auto justify-center py-8 md:px-8">
          <p className="my-auto text-gray-500 mm:text-xs sm:text-sm md:text-xs lg:text-lg font-bold">
            Trusted by:
          </p>
          {fiverrTrusted.map((brand, idx) => {
            const { brandName, imgSrc } = brand;
            return (
              <div
                key={brandName}
                className="mx-auto lg:w-20 lg:h-16 mm:w-8 mm:h-8"
              >
                <img
                  src={imgSrc}
                  alt={brandName}
                  className="bg-gray-50 w-full h-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default memo(HomeBanner);
