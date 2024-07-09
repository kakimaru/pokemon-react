import React, { useState } from "react";

const Header = ({ jaBtn, isJapanese }) => {
  return (
    <header className="sticky top-0 px-8 py-4 flex justify-between items-center bg-gray-900 border-b border-gray-600">
      <h1 className="text-white font-bold text-3xl">Pokemon encyclopedia</h1>
      <div className="bg-gray-600 p-2 flex rounded-full">
        <button
          className={`text-sm text-center w-9 h-9 rounded-full transition-all ease-linear ${
            isJapanese ? "text-gray-400" : "text-white bg-purple-600"
          }`}
          onClick={jaBtn}
        >
          A
        </button>
        <button
          className={`text-sm text-center w-9 h-9 rounded-full transition-all ease-linear ${
            isJapanese ? "text-white bg-purple-600" : "text-gray-400 "
          }`}
          onClick={jaBtn}
        >
          あ
        </button>
      </div>
    </header>
  );
};

export default Header;
