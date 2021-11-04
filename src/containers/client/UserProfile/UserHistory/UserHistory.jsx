import React from "react";

export default function UserHistory() {
  return (
    <div className="ml-20 flex flex-col">
      <div className="userhistory__services mt-11 mb-6">
        <div className="border-black pt-4 pl-8 pr-4 pb-6 border-2 border-opacity-50">
          <div className="flex">
            <div className="">
              <img
                src="https://npm-assets.fiverrcdn.com/assets/@fiverr-private/business_blocks/office-building.7ac5061.gif"
                alt="Office Building"
              />
            </div>
            <div className="text-left ml-2 text-sm">
              <div className="font-bold text-xl mb-2">
                Buying services for work?{" "}
                <span className="font-normal">
                  Get the best experience for your business with 3 quick
                  questions.
                </span>
              </div>
              <div className="cursor-pointer text-green-500">
                What's your industry
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="userhistory__gig">
        <div className="border-black pt-4 pl-8 pr-4 pb-6 border-2 border-opacity-50">
          <div className="flex justify-between">
            <div className="my-auto">
              It seems that you don't have any active Gigs. Get selling!
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Create a New Gig
            </button>
          </div>
        </div>
      </div>
      <div className="userhistory__list"></div>
    </div>
  );
}
