import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
export default function Rating({ productRating }) {
  return [...new Array(5)].map((_, index) => {
    const ratingVal = index + 1;
    return (
      <label key={index}>
        <input type="radio" value={ratingVal} style={{ display: "none" }} />
        <FontAwesomeIcon icon={faStar} color={ratingVal <= Math.round(productRating) ? "#f5d95d" : "#dddde3"} />
      </label>
    );
  });
}
