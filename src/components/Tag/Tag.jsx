import React from "react";

export default function Tag(props) {
  const { onlineSellers, localSellers, deliveryTime, proServices } =
    props.allTag;
  const ONLINESELLER = "Online";
  const LOCALSELLER = "Local";
  const DELIVERYTIME = "Delivery";
  const PROSERVICES = "Pro";
  return (
    <ul className="list-none mb-0 flex flex-wrap flex-auto justify-end gap-1">
      <li
        className={`${
          onlineSellers &&
          "text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full"
        }`}
      >
        {onlineSellers && ONLINESELLER}
      </li>
      <li
        className={`${
          localSellers &&
          "text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full"
        }`}
      >
        {localSellers && LOCALSELLER}
      </li>
      <li
        className={`${
          deliveryTime &&
          "text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full"
        }`}
      >
        {deliveryTime && DELIVERYTIME}
      </li>
      <li
        className={`${
          proServices &&
          "text-xs inline-flex ml-1 items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full"
        }`}
      >
        {proServices && PROSERVICES}
      </li>
    </ul>
  );
}
