"use client";

import React, { useEffect } from "react";

const Button = ({ title, handleClick }) => {
  return (
    <button
      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200"
      onClick={() => {
        handleClick();
      }}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#111827] rounded-md group-hover:bg-opacity-0">
        {title}
      </span>
    </button>
  );
};

export default Button;
