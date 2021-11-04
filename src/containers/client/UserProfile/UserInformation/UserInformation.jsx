import React from "react";
import { PencilIcon } from "@heroicons/react/solid";
import { LocationMarkerIcon, UserIcon } from "@heroicons/react/outline";
export default function UserInformation() {
  return (
    <div className="flex flex-col">
      <div className="userinfor__top mt-11 mb-8">
        <div className="max-w-sm rounded overflow-hidden shadow-lg border-black">
          <img
            className="mx-auto w-16 h-16 rounded-full"
            src="https://picsum.photos/200/300"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">User Name</div>
            <div className="w-5 h-auto mx-auto cursor-pointer">
              <PencilIcon />
            </div>
            <button className="my-2 w-full bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
              Button
            </button>
          </div>
          <div className="px-6 pt-4 pb-2">
            <ul className="list-none flex justify-between">
              <li>
                <LocationMarkerIcon />
                From
              </li>
              <li>Vietnam</li>
            </ul>
            <ul className="list-none flex justify-between">
              <li>
                <UserIcon className="w-10 h-auto" />
                Member since
              </li>
              <li>Aug 2021</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="userinfor_middle mb-8">
        <div className="max-w-sm rounded overflow-hidden shadow-lg border-black pt-8 px-7 pb-4">
          <img
            className=""
            src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_png/v1/attachments/generic_asset/asset/6bef0aaa4d62dcf41383658e5e3211ee-1571214998624/fiverrlearn_logo.svg"
            alt="Sunset in the mountains"
          />
          <img
            className="mx-auto"
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
              <div className="font-bold text-xl text-left">Description</div>
              <div className="cursor-pointer font-bold text-xs mt-auto text-blue-400">
                Edit Description
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold text-xl text-left">Languages</div>
              <div className="cursor-pointer font-bold text-xs mt-auto text-blue-400">
                Add New
              </div>
            </div>
            <div className="">
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
            <div className="flex justify-between">
              <div className="font-bold text-xl text-left">Skills</div>
              <div className="cursor-pointer font-bold text-xs mt-auto text-blue-400">
                Add New
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold text-xl text-left">Education</div>
              <div className="cursor-pointer font-bold text-xs mt-auto text-blue-400">
                Add New
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold text-xl text-left">Certification</div>
              <div className="cursor-pointer font-bold text-xs mt-auto text-blue-400">
                Add New
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
