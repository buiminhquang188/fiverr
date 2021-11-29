/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/solid";
import {
  LocationMarkerIcon,
  UserIcon,
  CameraIcon,
} from "@heroicons/react/outline";
import "./UserInformation.scss";
import clientApi from "apis/clientApi";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
export default function UserInformation(props) {
  const currentUser = useSelector((state) => state.authReducer.currentUser);

  const { token, idUser } = currentUser;
  const { userData, userName } = props;
  const [imgSrc, setImgSrc] = useState({
    imgSrc: null,
  });

  const inputFile = useRef(null);
  const { birthday, certification, gender, name, skill } = userData;

  useEffect(() => {
    setImgSrc({
      imgSrc: userData.avatar,
    });
    // window.scrollTo(0, 0);
  }, []);

  const handleInput = () => {
    inputFile.current.click();
  };

  const handleUpload = () => {
    const file = inputFile.current.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc({
        imgSrc: e.target.result,
      });
    };
    let formData = new FormData();
    formData.append("avatar", file, file.name);
    clientApi
      .fetchUploadAvatar(formData, token)
      .then((result) => {
        alert("Update avatar success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="lg:max-w-sm lg:w-full mm:w-full md:w-60 flex flex-col mb-28">
      <div className="userinfor__top mt-11 mb-8">
        <div className="rounded overflow-hidden shadow-lg border-black">
          <div className="avatar-wrapper">
            <img
              className="mx-auto w-40 h-40 my-auto rounded-full mt-5 object-cover"
              src={
                imgSrc.imgSrc
                  ? imgSrc.imgSrc
                  : `https://ui-avatars.com/api/?name=${userName.name}`
              }
              alt="Avatar user"
            />
            <div className="upload-button" onClick={handleInput}>
              <CameraIcon className="mx-auto my-auto camera-icon" />
            </div>
            <input
              className="file-upload"
              type="file"
              accept="image/*"
              ref={inputFile}
              onChange={(e) => handleUpload(e)}
            />
          </div>
          <div className="px-6">
            <div className="font-bold text-xl mb-2">{name}</div>
            <Link
              to={{
                pathname: `/edit-user/${idUser}`,
                state: { userNeedUpdate: userData },
              }}
              className="text-black hover:text-green-500"
            >
              <PencilIcon className="w-8 h-8 mx-auto" />
            </Link>
          </div>
          <div className="px-6 pt-4 pb-2">
            <ul className="list-none flex justify-between">
              <li>
                <div className="flex">
                  <LocationMarkerIcon className="w-7 h-auto mx-auto" />
                  <div className="my-auto">From</div>
                </div>
              </li>
              <li>Vietnam</li>
            </ul>
            <ul className="list-none flex justify-between">
              <li>
                <div className="flex">
                  <UserIcon className="w-7 h-auto mx-auto" />
                  <div className="my-auto">Member since</div>
                </div>
              </li>
              <li>Aug 2021</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="userinfor_middle mb-8">
        <div className="max-w-sm rounded overflow-hidden shadow-lg border-black pt-8 px-7 pb-4">
          <img
            src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_png/v1/attachments/generic_asset/asset/6bef0aaa4d62dcf41383658e5e3211ee-1571214998624/fiverrlearn_logo.svg"
            alt="Sunset in the mountains"
          />
          <img
            className="mx-auto py-2"
            src="https://npm-assets.fiverrcdn.com/assets/@fiverr-private/fiverr_learn/enroll-icon.69b770f.svg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Earn badges and stand out
            </div>
            <p className="text-gray-700 text-base">
              Boost your sales, by boosting your expertise.
            </p>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Button
          </button>
        </div>
      </div>
      <div className="userinfor__bottom">
        <div className="max-w-sm rounded overflow-hidden shadow-lg border-black">
          <div className="p-8">
            <div className="flex justify-between">
              <div className="font-bold text-xl text-left">Skills</div>
              <div className="cursor-pointer font-bold text-xs mt-auto text-blue-400">
                Update All
              </div>
            </div>
            <div className="text-left flex justify-start">
              {skill.map((item, index) => {
                return (
                  <div className="p-1 mt-1" key={item}>
                    {item + ","}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2">
              <div className="font-bold text-xl text-left">Certification</div>
            </div>
            <div className="text-left flex justify-start ml-2">
              {certification.map((item, index) => {
                return (
                  <div className="pr-1 mt-1" key={item}>
                    {item + ","}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2">
              <div className="font-bold text-xl text-left">Birthday</div>
            </div>
            <div className="flex mt-1">
              <div className="ml-2">
                {moment(birthday).format("DD/MM/YYYY")}
              </div>
            </div>
            <div className="mt-2">
              <div className="font-bold text-xl text-left">Linked Accounts</div>
              <div className="">
                <ul className="text-left ml-2 mt-2">
                  <li>Facebook</li>
                  <li>Google</li>
                  <li>Dribbble</li>
                  <li>Stack Overflow</li>
                  <li>Github</li>
                  <li>Vimeo</li>
                  <li>Twitter</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
