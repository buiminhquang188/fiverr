import clientApi from "apis/clientApi";
import React, { useEffect, useState } from "react";
import { Select, Switch, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";
import { HeartIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/outline";
import Tag from "components/Tag/Tag";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

function onChange(checked) {}

const { Option } = Select;
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
};

export default function JobSearch(props) {
  let [services, setServices] = useState([]);
  let [loading, setLoading] = useState(true);

  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  useEffect(() => {
    clientApi
      .searchItem(props.match.params.searchId)
      .then((result) => {
        let listServices = result.data;
        setServices({
          listServices,
        });
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  if (loading) return <Loader />;
  const { listServices } = services;
  return (
    <div className="container">
      <div className="jobsearch__top text-left py-32">
        <h3>Result for "{props.match.params.searchId}"</h3>
        <div className="flex justify-between jobsearch__filter">
          <div className="grid grid-cols-5 gap-3">
            <div>
              <Select
                defaultValue={provinceData[0]}
                style={{ width: 120 }}
                onChange={handleProvinceChange}
              >
                {provinceData.map((province) => (
                  <Option key={province}>{province}</Option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                style={{ width: 120 }}
                value={secondCity}
                onChange={onSecondCityChange}
              >
                {cities.map((city) => (
                  <Option key={city}>{city}</Option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                defaultValue={provinceData[0]}
                style={{ width: 120 }}
                onChange={handleProvinceChange}
              >
                {provinceData.map((province) => (
                  <Option key={province}>{province}</Option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                style={{ width: 120 }}
                value={secondCity}
                onChange={onSecondCityChange}
              >
                {cities.map((city) => (
                  <Option key={city}>{city}</Option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                style={{ width: 120 }}
                value={secondCity}
                onChange={onSecondCityChange}
              >
                {cities.map((city) => (
                  <Option key={city}>{city}</Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 jobsearch__services gap-3">
            <div>
              <Switch defaultChecked onChange={onChange} />
              <span className="pl-2">Pro services</span>
            </div>
            <div>
              <Switch defaultChecked onChange={onChange} />
              <span className="pl-2">Local sellers</span>
            </div>
            <div>
              <Switch defaultChecked onChange={onChange} />
              <span className="pl-2">Online sellers</span>
            </div>
          </div>
        </div>
      </div>
      <div className="jobsearch__result text-left py-32">
        <div className="flex justify-between">
          <div className="text-xs">
            {listServices.length} services available
          </div>
          <div className="">
            <Dropdown overlay={menu} trigger={["click"]}>
              <div
                className="ant-dropdown-link cursor-pointer text-blue-500"
                onClick={(e) => e.preventDefault()}
              >
                <span className="text-black">Sort by</span> <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="jobsearch__content py-12">
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
            {listServices.map((services) => {
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
                <div className="col mb-4" key={_id}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
