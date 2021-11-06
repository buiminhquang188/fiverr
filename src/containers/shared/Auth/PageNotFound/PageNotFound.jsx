import React from "react";

export default function PageNotFound() {
  return (
    <div className="pagenotfound">
      <div className="container">
        <div className="mx-auto my-20">
          <div className="pagenotfound__img max-h-screen">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/apps/empty-search-results.229c0d3.png"
              alt="empty result images"
              className="w-auto h-full mx-auto"
            />
            <h2>No Services Found For Your Search</h2>
            <h5 className="max-w-lg mx-auto">
              Try a new search or get a free quote for your project from our
              community of freelancers.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
