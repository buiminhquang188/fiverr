import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./HomeContent.scss";
import {
  HomeContentConfig,
  guides,
  services,
  feedback,
  inspired,
} from "./HomeContentConfig";
import { CheckCircleIcon } from "@heroicons/react/outline";
import Slider from "react-slick";
import fiverr_business from "assets/images/fiverr_business.svg";
import fiverr_maker from "assets/images/fiverr_maker.svg";

const settings = {
  infinite: true,
  speed: 500,
  focusOnSelect: false,
  slidesToShow: 5,
  slidesToScroll: 5,
  arrow: false,
  dots: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
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
        slidesToShow: 2,
        slidesToScroll: 2,
        arrow: false,
      },
    },
  ],
};
const settings2 = {
  infinite: true,
  speed: 500,
  focusOnSelect: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const settingSlickInspired = {
  infinite: true,
  speed: 500,
  focusOnSelect: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  dots: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function HomeContent() {
  return (
    <div className="home">
      <div className="popular py-16">
        <div className="lg:max-w-screen-2xl sm:max-w-screen-sm md:max-w-screen-md mx-auto">
          <h2 className="text-left mm:text-base ml-2 md:text-lg lg:text-3xl">
            Popular professional services
          </h2>
          <div className="popular__slick">
            <div className="lg:py-0 mm:px-12">
              <Slider {...settings}>
                {services.map((items) => {
                  const { imgSrc, service } = items;
                  return (
                    <div
                      className="popular__contain lg:px-3 mm:px-3"
                      key={service}
                    >
                      <img
                        src={imgSrc}
                        alt={services}
                        className="lg:h-96 mm:h-56 object-cover rounded mx-auto"
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="pros py-16 bg-gray-100">
        <div className="lg:max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-2 mm:grid-cols-1 md:grid-cols-2 gap-3">
            <div className="props__content mm:px-4 mm:text-left">
              <h2 className="mm:text-base sm:text-sm md:text-lg lg:text-3xl">
                A whole world of freelance talent at your fingertips
              </h2>
              <ul className="list-none mm:text-sm sm:text-sm md:text-base lg:text-lg">
                <li>
                  <div className="flex justify-start">
                    <CheckCircleIcon className="w-8 h-8 inline-block text-gray-500" />
                    <h5 className="ml-1 mm:text-sm sm:text-sm md:text-base lg:text-lg mm:my-auto">
                      The best for every budget
                    </h5>
                  </div>
                  <p className="text-gray-500 font-medium">
                    Find high-quality services at every price point. No hourly
                    rates, just project-based pricing.
                  </p>
                </li>
                <li>
                  <div className="flex justify-start">
                    <CheckCircleIcon className="w-8 h-8 inline-block text-gray-500" />
                    <h5 className="ml-1 mm:text-sm sm:text-sm md:text-base lg:text-lg mm:my-auto">
                      Quality work done quickly
                    </h5>
                  </div>
                  <p className="text-gray-500 font-medium">
                    Find the right freelancer to begin working on your project
                    within minutes.
                  </p>
                </li>
                <li>
                  <div className="flex justify-start">
                    <CheckCircleIcon className="w-8 h-8 inline-block text-gray-500" />
                    <h5 className="ml-1 mm:text-sm sm:text-sm md:text-base lg:text-lg mm:my-auto">
                      Protected payments, every time
                    </h5>
                  </div>
                  <p className="text-gray-500 font-medium">
                    Always know what you'll pay upfront. Your payment isn't
                    released until you approve the work.
                  </p>
                </li>
                <li>
                  <div className="flex justify-start">
                    <CheckCircleIcon className="w-8 h-8 inline-block text-gray-500" />
                    <h5 className="ml-1 mm:text-sm sm:text-sm md:text-base lg:text-lg mm:my-auto">
                      24/7 support
                    </h5>
                  </div>
                  <p className="text-gray-500 font-medium">
                    Questions? Our round-the-clock support team is available to
                    help anytime, anywhere.
                  </p>
                </li>
              </ul>
            </div>
            <div className="pros__video flex content-center">
              <div className="pros__wrapper relative md:my-auto md:mr-2">
                <img
                  src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
                  alt="video img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="marketplace py-16">
        <div className="lg:max-w-screen-2xl mx-auto">
          <h2 className="text-left mm:text-base sm:text-base md:text-lg lg:text-3xl md:ml-2">
            Explore the marketplace
          </h2>
          <div className="grid lg:grid-cols-5 gap-10 mm:gap-3 mm:grid-cols-3">
            {HomeContentConfig.map((marketplace) => {
              const { imgSrc, marketname } = marketplace;
              return (
                <div key={marketname}>
                  <Link to="/">
                    <img
                      src={imgSrc}
                      alt={marketname}
                      className="w-12 h-auto block mx-auto"
                    />
                    <p className="mm:text-xs sm:text-base md:text-base lg:text-lg text-gray-600">
                      {marketname}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="business bg-indigo-900 py-16">
        <div className="lg:max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-12 mm:grid-cols-1 md:grid-cols-12 mm:gap-4 mm:px-4">
            <div className="business__text text-left text-white col-span-5">
              <div className="flex justify-start">
                <img
                  className="inline-block mm:w-28 mm:h-auto"
                  src={fiverr_business}
                  alt="Fiverr Business"
                />
                <div className="my-auto ml-2 py-1 lg:px-2 border-2 border-indigo-500 bg-indigo-500 rounded-full font-bold mm:text-xs sm:text-base md:text-sm lg:text-lg mm:px-1 md:py-1">
                  New
                </div>
              </div>
              <h2 className="text-white mm:text-base sm:text-base md:text-lg lg:text-3xl">
                A business solution designed for
                <span className="italic ml-1">teams</span>
              </h2>
              <p className="mm:text-xs sm:text-sm md:text-sm lg:text-3xl">
                Upgrade to a curated experience packed with tools and benefits,
                dedicated to businesses
              </p>
              <ul className="list-none">
                <div className="flex justify-start ml-2 mt-3">
                  <CheckCircleIcon className="w-8 h-8 mm:w-8 mm:h-8 text-gray-500" />
                  <li className="my-auto mm:text-xs sm:text-sm md:text-sm lg:text-lg mm:ml-1">
                    Connect to freelancers with proven business experience
                  </li>
                </div>
                <div className="flex justify-start ml-2 mt-3">
                  <CheckCircleIcon className="w-8 h-8 mm:w-8 mm:h-8 text-gray-500" />
                  <li className="my-auto mm:text-xs sm:text-sm md:text-sm lg:text-lg mm:ml-1">
                    Get matched with the perfect talent by a customer success
                    manager
                  </li>
                </div>
                <div className="flex justify-start ml-2 mt-3">
                  <CheckCircleIcon className="w-8 h-8 mm:w-8 mm:h-8 text-gray-500" />
                  <li className="my-auto mm:text-xs sm:text-sm md:text-sm lg:text-lg mm:ml-1">
                    Manage teamwork and boost productivity with one powerful
                    workspace
                  </li>
                </div>
              </ul>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mm:text-xs sm:text-sm md:text-sm lg:text-lg">
                Explore Fiverr Business
              </button>
            </div>
            <div className="business__images col-span-7">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
                alt="Fiver Business freelancers"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="feedback py-16">
        <div className="lg:max-w-screen-2xl mx-auto">
          <div className="feedback__slick px-3">
            <div className="mm:px-3">
              <Slider {...settings2}>
                {feedback.map((info, idx) => {
                  const { imgSrc, brand, position, quotes } = info;
                  return (
                    <div key={idx}>
                      <div className="grid lg:grid-cols-12 mm:grid-cols-1 mm:gap-3 mx-3">
                        <div className="lg:col-span-4 mm:col-span-12">
                          <img
                            src={imgSrc}
                            alt={position}
                            className="w-full h-full rounded-xl"
                          />
                        </div>
                        <div className="lg:col-span-8 w-full mm:col-span-12">
                          <div className="flex justify-center">
                            <div className="feedback__position my-auto">
                              {position}
                            </div>
                            <div className="feedback__brand">
                              <img src={brand} alt={position} />
                            </div>
                          </div>
                          <blockquote>{quotes}</blockquote>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="maker px-8">
        <div className="lg:max-w-screen-2xl mx-auto">
          <div className="bg-blue-600 border-2 border-blue-600 rounded-xl mm:py-5 lg:py-0">
            <div className="grid lg:grid-cols-12 mm:grid-cols-1">
              <div className="maker__content col-span-4 mm:grid-cols-12">
                <div className="lg:px-20 mm:px-2 lg:py-12 h-full">
                  <img src={fiverr_maker} alt="Fiverr logo maker" />
                  <h2 className="text-base text-left text-white lg:text-3xl">
                    Make an incredible logo
                    <span className="block italic mm:inline-block mm:ml-1">
                      in minutes
                    </span>
                  </h2>
                  <p className="text-left text-white">
                    Pre-designed by top talent. Just add your touch.
                  </p>
                  <div className="mm:w-full mm:text-left">
                    <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-gray-400 py-2 px-4 border border-blue-500 hover:border-transparent rounded text-left">
                      Try Fiverr Logo Maker
                    </button>
                  </div>
                </div>
              </div>
              <div className="maker__img col-span-8 mm:grid-cols-12">
                <img
                  className='lg:w-full lg:h-full object-cover'
                  srcSet="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1160,dpr_1.0/v1/attachments/generic_asset/asset/b49b1963f5f9008f5ff88bd449ec18f7-1608035772453/logo-maker-banner-wide-desktop-1352-2x.png"
                  alt="Fiver logo maker background"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inspired py-20">
        <div className="bg-gray-50 py-20">
          <div className="lg:max-w-screen-2xl mx-auto">
            <div className="inspired__slick px-3">
              <div className="mm:px-3">
                <Slider {...settingSlickInspired}>
                  {inspired.map((items) => {
                    const { auth, imgSrc, title } = items;
                    return (
                      <div className="inspired__card">
                        <div className="rounded overflow-hidden lg:mx-3 mm:mx-1 shadow-md">
                          <img
                            className="w-full h-64"
                            src={imgSrc}
                            alt="Sunset in the mountains"
                          />
                          <div className="px-6 pt-4 pb-2 flex">
                            <div className="inspried__content text-left">
                              <h6>{title}</h6>
                              <p>by {auth}</p>
                            </div>
                          </div>
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
      <div className="guides">
        <div className="bg-white">
          <div className="lg:max-w-screen-2xl mx-auto">
            <div className="mx-auto px-4 py-12 sm:px-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 text-left mm:text-base sm:text-sm md:text-lg lg:text-4xl">
                Fiverr guides
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
                {guides.map((product) => {
                  const { content, id, imgSrc, title } = product;
                  return (
                    <Link to="/">
                      <div key={id} className="group relative">
                        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                          <img
                            src={imgSrc}
                            alt={title}
                            className="w-full h-full object-cover lg:w-full lg:h-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h6 className="text-black text-left text-xs lg:text-lg">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {title}
                            </h6>
                            <p className="mt-1 text-gray-500 text-left text-xs lg:text-lg">
                              {content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="started lg:px-8 mm:px-2 lg:mb-36 mm:mb-10">
        <div className="lg:max-w-screen-2xl mx-auto">
          <div className="started__img relative">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1400,dpr_1.0/v1/attachments/generic_asset/asset/50218c41d277f7d85feeaf3efb4549bd-1599072608122/bg-signup-1400-x1.png"
              alt="Fiver Started Background"
              className="mx-auto rounded-xl mm:w-full"
            />
            <div className="started__content absolute top-0 left-0 lg:px-8 lg:py-36 md:py-20 mx-10 h-full">
              <div className="flex justify-start flex-shrink lg:pr-96 mm:pt-2">
                <div>
                  <h2 className="text-white mm:text-base sm:text-sm md:text-lg lg:text-5xl text-left">
                    Find the <span className="italic">talent</span> needed to
                    get your business <span className="italic">growing.</span>
                  </h2>
                  <div className="text-left">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold sm:py-2 sm:px-4 rounded mm:text-base lg:text-lg mm:py-1 mm:px-2">
                      Get Started
                    </button>
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

export default memo(HomeContent);
