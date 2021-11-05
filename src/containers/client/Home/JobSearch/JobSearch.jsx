import clientApi from "apis/clientApi";
import React, { useEffect, useState } from "react";
import { Select, Switch, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";
import { HeartIcon } from "@heroicons/react/solid";

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

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

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
        alert.log(err);
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
              console.log(services);
              const {
                id,
                name,
                description,
                price,
                image,
                category,
                subCategory,
              } = services;
              return (
                <div className="col mb-4" key={id}>
                  <div className="card">
                    <img src={image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">{description}</p>
                    </div>
                    <div className="card-footer">
                      <div className="flex justify-between">
                        <div className="">
                          <span>
                            <HeartIcon className="w-7 h-auto" />
                          </span>
                        </div>
                        <div className="">{price}</div>
                      </div>
                    </div>
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
