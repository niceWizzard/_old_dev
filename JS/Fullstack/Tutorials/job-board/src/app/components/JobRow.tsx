import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const JobRow = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex gap-4 relative">
      <div className="absolute top-2 right-3 cursor-pointer">
        <FontAwesomeIcon icon={faHeart} className="size-5 text-gray-400" />
      </div>
      <div className="content-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
          alt="Logo"
          className="size-12 "
        />
      </div>
      <div className="md:flex grow">
        <div className="flex flex-col grow">
          <span className="text-gray-700 text-sm">Spotify</span>
          <span className="font-bold my-2 text-lg">Product Designer</span>
          <span className="text-gray-600 text-sm">
            Remote &middot; New York, Us
          </span>
        </div>
        <span className="content-end text-gray-500  text-sm">2 weeks ago</span>
      </div>
    </div>
  );
};

export default JobRow;
