import React from "react";
import { fiverrBanner, fiverrTrusted } from "./HomeBannerConfig";
import Slider from "react-slick";
import Search from "antd/lib/input/Search";
import { SearchIcon } from "@heroicons/react/outline";

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
export default function HomeBanner() {
  const onSearch = (value) => console.log(value);

  return (
    <div className="banner">
      <div className="banner__wrapper relative">
        <Slider {...settings}>
          {fiverrBanner.map((banner) => {
            const { imgSrc, name, job } = banner;
            return (
              <div className="banner__img relative" key={name}>
                <img src={imgSrc} alt={name} className="w-full object-cover" />
                <div className="banner__info absolute z-10 bottom-0 right-0 p-5">
                  <h5 className="text-white">
                    {name}, {job}
                  </h5>
                </div>
              </div>
            );
          })}
        </Slider>
        <div className="banner__content absolute top-1/4 left-16 h-full max-w-2xl">
          <div>
            <h1>
              Find the perfect <span className="italic">freelance</span>{" "}
              services for your business
            </h1>
            <Search
              placeholder="Try search something"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              prefix={prefixIcons}
            />
            <div className="banner__icon absolute z-50 top-0 left-0"></div>
          </div>
        </div>
      </div>
      <div className="banner__trust bg-gray-50">
        <div className="flex max-w-4xl mx-auto justify-center py-8">
          <p className="my-auto">Trusted by:</p>
          {fiverrTrusted.map((brand, idx) => {
            const { brandName, imgSrc } = brand;
            return (
              <div key={brandName} className="mx-auto">
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
