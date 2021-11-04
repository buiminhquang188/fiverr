import clientApi from "apis/clientApi";
import React from "react";

export default function JobList() {
  clientApi
    .fetchItem()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  return <div>JobList</div>;
}
