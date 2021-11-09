import React, { useState, useEffect } from "react";
import clientApi from "apis/clientApi";
import Loader from "components/Loader/Loader";
import { Rate } from "antd";
import Slider from "react-slick";
import JobDetailComment from "./JobDetailComment/JobDetailComment";

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
      return (
        <a>
          <img src={`https://picsum.photos/id/${i}/200/300`} alt="test" />
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
      .fetchDetailJobs(id)
      .then((result) => {
        detailJob = result.data;
        setDetail(detailJob);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, [props.match.params.id]);

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
                <div className="ml-2">
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
            <div className="jobdetail__about">
              <div className="jobdetail__content">
                <h5>About This Gig</h5>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Excepturi accusantium tenetur beatae dolore alias adipisci qui
                  consequatur, corrupti, rerum voluptas porro natus illum et
                  iure assumenda accusamus perspiciatis earum fuga? Debitis enim
                  voluptatem tempore cumque dolorem architecto reiciendis totam
                  harum deserunt modi nemo eum sequi commodi laudantium cum
                  itaque quod, consequatur doloribus quos. Cupiditate illum odit
                  possimus temporibus laudantium assumenda? Dolorum numquam
                  ipsam, recusandae molestiae dolores voluptatum. Earum cum non
                  quibusdam soluta consequatur eligendi neque repellat alias
                  est. Fuga possimus quod doloremque soluta, itaque natus est
                  reiciendis velit quia cumque! Quibusdam dolorem quam eos,
                  itaque ad, laborum voluptatem at voluptatibus incidunt
                  accusamus quo. Magnam facilis voluptate deleniti expedita
                  minus, rerum eligendi eveniet, est id, debitis nulla optio
                  nobis iste. Illum! Ut beatae similique dolorem voluptates
                  rerum placeat, animi ipsum ipsam non, in hic consectetur
                  laboriosam numquam natus quidem iure aspernatur illo fugiat ex
                  aliquam vero molestias ipsa architecto. Voluptas, minus.
                  Excepturi, in eos. Atque odio asperiores tempora. Temporibus
                  dolores magni tempora, sint quasi consectetur mollitia
                  adipisci nobis pariatur commodi, eligendi quod autem quas. Est
                  recusandae, a eaque harum fugiat pariatur. Inventore
                  distinctio culpa magnam, doloribus eaque ipsam ex asperiores
                  quam laudantium obcaecati, sint mollitia deserunt dolorem
                  nihil corporis dignissimos odit recusandae velit veniam.
                  Expedita, maxime repellendus! Suscipit laborum nihil libero?
                  Similique, itaque. Qui quo quisquam, non vel consequuntur
                  magnam sequi delectus deleniti natus maiores sunt molestias
                  laudantium mollitia iusto explicabo fugit molestiae architecto
                  necessitatibus repellendus suscipit. Fuga optio sequi
                  voluptatum. Suscipit quae minus consectetur? Repellendus qui
                  placeat ipsa distinctio tempora vero quis reprehenderit porro
                  atque laborum amet dolore soluta, aspernatur adipisci
                  doloribus tenetur laudantium pariatur? Similique sit
                  blanditiis excepturi ipsa? Impedit, ex dolorem cumque corrupti
                  quod quo eius laboriosam quisquam maiores modi at illo minima
                  nesciunt recusandae quasi repellat vero voluptate
                  reprehenderit eveniet! Quisquam, cum quidem! Eaque vero
                  dolores culpa?
                </p>
                <div className="flex justify-between text-left">
                  <div className="">
                    <h6>Languages</h6>
                    <p>English, French, German</p>
                  </div>
                  <div className="px-32">
                    <h6>Industry</h6>
                    <p>
                      Administrative, Engineering, Financial Services, Marketing
                      Sales
                    </p>
                  </div>
                  <div className="">
                    <h6>File type</h6>
                    <p>
                      Doc (Microsoft Word) PDF (Adobe Acrobat) PSD (Adobe
                      Photoshop)
                    </p>
                  </div>
                </div>
              </div>
              <div className="jobdetail__sellers">
                <h5>About the sellers</h5>
                <div className="flex">
                  <div className="w-14 h-14">
                    <img
                      src="https://picsum.photos/id/237/200/300"
                      alt="sellers"
                      className="rounded-full w-full h-full"
                    />
                  </div>
                  <div>
                    <ul className="list-none">
                      <li>Name Seller</li>
                      <li>Role</li>
                      <li>
                        <Rate disabled defaultValue={3} />
                      </li>
                      <li>
                        <button className="bg-gray-200 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded">
                          Button
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="jobdetail__faq">
                <h6>FAQ</h6>
                <ul className="list-none">
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                </ul>
              </div>
              <div className="jobdetail__review">
                <div className="jobdetail__rating"></div>
                <JobDetailComment />
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
