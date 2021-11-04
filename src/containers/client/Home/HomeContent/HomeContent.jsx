import React from "react";
import { Link } from "react-router-dom";
import "./HomeContent.scss";
import {
  HomeContentConfig,
  guides,
  services,
  feedback,
  inspired,
} from "./HomeContentConfig";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import fiverr_business from "assets/images/fiverr_business.svg";
import fiverr_maker from "assets/images/fiverr_maker.svg";

const settings = {
  infinite: true,
  speed: 500,
  focusOnSelect: false,
  slidesToShow: 5,
  slidesToScroll: 5,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const settings2 = {
  infinite: true,
  speed: 500,
  focusOnSelect: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const settingSlickInspired = {
  infinite: true,
  speed: 500,
  focusOnSelect: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "-10px",
        backgroundColor: "black",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "-10px",
        backgroundColor: "black",
      }}
      onClick={onClick}
    />
  );
}

export default function HomeContent() {
  return (
    <div className="home">
      <div className="popular py-16">
        <h2 className="text-left">Popular professional services</h2>
        <div className="popular__slick container-fluid">
          <Slider {...settings}>
            {services.map((items) => {
              const { imgSrc, content, service } = items;
              return (
                <div className="popular__contain px-3" key={service}>
                  <img
                    src={imgSrc}
                    alt={services}
                    className="h-96 object-cover rounded"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className="pros py-16 bg-indigo-400">
        <div className="grid grid-cols-2">
          <div className="props__content text-left">
            <h2>A whole world of freelance talent at your fingertips</h2>
            <ul className="list-none">
              <li>
                <h3>The best for every budget</h3>
                <p>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing.
                </p>
              </li>
              <li>
                <h3>Quality work done quickly</h3>
                <p>
                  Find the right freelancer to begin working on your project
                  within minutes.
                </p>
              </li>
              <li>
                <h3>Protected payments, every time</h3>

                <p>
                  Always know what you'll pay upfront. Your payment isn't
                  released until you approve the work.
                </p>
              </li>
              <li>
                <h3>24/7 support</h3>
                <p>
                  Questions? Our round-the-clock support team is available to
                  help anytime, anywhere.
                </p>
              </li>
            </ul>
          </div>
          <div className="pros__video flex content-center">
            <div className="pros__wrapper relative">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
                alt="video img"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="marketplace py-16">
        <h2 className="text-left">Explore the marketplace</h2>
        <div className="grid grid-cols-5 gap-10">
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
                  <p>{marketname}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="business bg-indigo-900 py-16">
        <div className="grid grid-cols-12">
          <div className="business__text text-left text-white col-span-5">
            <img src={fiverr_business} alt="Fiverr Business" />
            <span>New</span>
            <h2 className="text-white">
              A business solution designed for
              <span className="italic">teams</span>
            </h2>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <ul className="list-none">
              <li>Connect to freelancers with proven business experience</li>
              <li>
                Get matched with the perfect talent by a customer success
                manager
              </li>
              <li>
                Manage teamwork and boost productivity with one powerful
                workspace
              </li>
            </ul>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
      <div className="feedback py-16">
        <div className="feedback__slick px-3">
          <Slider {...settings2}>
            {feedback.map((info, idx) => {
              const { imgSrc, brand, position, quotes } = info;
              return (
                <div key={idx}>
                  <div className="grid grid-cols-12">
                    <div className="col-span-4">
                      <img src={imgSrc} alt={position} />
                    </div>
                    <div className="col-span-8 w-full">
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
      <div className="maker px-8">
        <div className="bg-blue-600">
          <div className="grid grid-cols-12">
            <div className="maker__content col-span-4">
              <img src={fiverr_maker} alt="Fiverr logo maker" />
              <h2>
                Make an incredible logo
                <span className="block">in minutes</span>
              </h2>
              <p>Pre-designed by top talent. Just add your touch.</p>
              <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-gray-400 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Try Fiverr Logo Maker
              </button>
            </div>
            <div className="maker__img col-span-8">
              <img
                srcSet="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1160,dpr_1.0/v1/attachments/generic_asset/asset/b49b1963f5f9008f5ff88bd449ec18f7-1608035772453/logo-maker-banner-wide-desktop-1352-2x.png"
                alt="Fiver logo maker background"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="inspired py-16">
        <div className="inspired__slick px-3">
          <Slider {...settingSlickInspired}>
            {inspired.map((items) => {
              const { auth, imgSrc, title } = items;
              return (
                <div className="inspired__card">
                  <div className="max-w-sm rounded overflow-hidden mx-3 shadow-lg">
                    <img
                      className="w-full h-64"
                      src={imgSrc}
                      alt="Sunset in the mountains"
                    />
                    <div className="px-6 pt-4 pb-2 flex">
                      <div className="inspried__img">
                        <img src="" alt="" />
                      </div>
                      <div className="inspried__content">
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
      <div className="guides">
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 text-left">
              Fiverr guides
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {guides.map((product) => {
                const { content, id, imgSrc, title } = product;
                return (
                  <Link to="/">
                    <div key={id} className="group relative">
                      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                        <img
                          src={imgSrc}
                          alt={title}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h6 className="text-black text-left">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {title}
                          </h6>
                          <p className="mt-1 text-sm text-gray-500">
                            {content}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="started px-8 mb-36">
        <div className="started__img relative">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1400,dpr_1.0/v1/attachments/generic_asset/asset/50218c41d277f7d85feeaf3efb4549bd-1599072608122/bg-signup-1400-x1.png"
            alt="Fiver Started Background"
            className="mx-auto"
          />
          <div className="started__content absolute top-40 left-40 px-8">
            <h2 className="text-white">
              Find the <span className="italic">talent</span> needed to get your
              business <span className="italic">growing.</span>
            </h2>
            <div className="text-left">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
