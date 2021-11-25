import React from "react";

export default function Tag(props) {
  const { onlineSellers, localSellers, deliveryTime, proServices } =
    props.allTag;
  const ONLINESELLER = "Online";
  const LOCALSELLER = "Local";
  const DELIVERYTIME = "Delivery";
  const PROSERVICES = "Pro";
  return (
    <ul className="list-none mb-0">
      <li
        className={`inline-block  ${
          onlineSellers &&
          "text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full"
        }`}
      >
        {onlineSellers && ONLINESELLER}
      </li>
      <li
        className={`inline-block  ${
          localSellers &&
          "text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full"
        }`}
      >
        {localSellers && LOCALSELLER}
      </li>
      <li
        className={`inline-block  ${
          deliveryTime &&
          "text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full"
        }`}
      >
        {deliveryTime && DELIVERYTIME}
      </li>
      <li
        className={`inline-block  ${
          proServices &&
          "text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full"
        }`}
      >
        {proServices && PROSERVICES}
      </li>
    </ul>
  );
}
