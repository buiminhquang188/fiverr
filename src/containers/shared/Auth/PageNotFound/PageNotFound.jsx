import React from "react";

export default function PageNotFound() {
  return (
    <div className="pagenotfound">
      <div className="container">
        <div className="mx-auto mt-20">
          <div className="pagenotfound__img h-64">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/apps/empty-search-results.229c0d3.png"
              alt="empty result images"
              className="w-auto h-full mx-auto"
            />
          </div>
          <h2>No Services Found For Your Search</h2>
          <h5 className="max-w-lg mx-auto">
            Try a new search or get a free quote for your project from our
            community of freelancers.
          </h5>
        </div>
      </div>
    </div>
  );
}
