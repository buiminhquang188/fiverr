import clientApi from "apis/clientApi";
import React, { useEffect, useState } from "react";
import { Switch, Pagination } from "antd";
import Loader from "components/Loader/Loader";
import { HeartIcon, StarIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Tag from "components/Tag/Tag";
import PageNotFound from "containers/shared/Auth/PageNotFound/PageNotFound";

const numEachPage = 15;
function onChange(checked) {
  console.log(checked);
}

export default function JobSearch(props) {
  let [services, setServices] = useState({
    listServices: null,
    isLoading: true,
  });
  const [currentPage, setCurrentPage] = useState({
    minValue: 0,
    maxValue: 15,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    clientApi
      .searchItem(props.match.params.searchId)
      .then((result) => {
        setServices({
          listServices: result.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [currentPage.minValue, currentPage.maxValue]);

  const handlePagination = (value) => {
    setCurrentPage({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
      isChange: true,
    });
  };

  if (services.isLoading) return <Loader />;
  if (services.listServices.length === 0) return <PageNotFound />;
  const { listServices } = services;
  return (
    <div className="mm:max-w-screen-mm md:max-w-screen-md lg:max-w-screen-2xl mx-auto">
      <div className="jobsearch__top text-left pt-20">
        <h3>Result for "{props.match.params.searchId}"</h3>
        <div className="flex justify-between jobsearch__filter">
          <div className="grid grid-cols-4 jobsearch__services gap-3">
            <div>
              <Switch onChange={onChange} />
              <span className="pl-2">Pro services</span>
            </div>
            <div>
              <Switch onChange={onChange} />
              <span className="pl-2">Online sellers</span>
            </div>
            <div>
              <Switch onChange={onChange} />
              <span className="pl-2">Local sellers</span>
            </div>
            <div>
              <Switch onChange={onChange} />
              <span className="pl-2">Delivery Time</span>
            </div>
          </div>
        </div>
      </div>
      <div className="jobsearch__result text-left pt-4 pb-20">
        <div className="flex justify-between">
          <div className="text-xs">
            {listServices.length} services available
          </div>
        </div>
        <div className="jobsearch__content pt-12">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 mm:grid-cols-1 gap-3">
            {listServices
              .slice(currentPage.minValue, currentPage.maxValue)
              .map((services) => {
                const {
                  _id,
                  name,
                  price,
                  image,
                  rating,
                  userCreated,
                  onlineSellers,
                  localSellers,
                  deliveryTime,
                  proServices,
                } = services;
                return (
                  <div className="h-80 md:mb-0 mm:mb-10" key={_id}>
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
        <div className="flex justify-end pt-2">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={numEachPage}
            onChange={handlePagination}
            total={listServices.length}
          />
        </div>
      </div>
    </div>
  );
}
