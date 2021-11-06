import React from "react";
import { Link } from "react-router-dom";

export default function HomeNavigation(props) {
  console.log(props.listTypeJobs);
  return (
    <div>
      <ul className="list-none my-auto mx-auto">
        {props.listTypeJobs.map((typeJob, index) => (
          <li key={index} className="inline-block text-base ml-3">
            <Link href={typeJob.url}>{typeJob.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
