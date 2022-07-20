import React from "react";

const LoadingModel = () => {
  return (
    <div className="min-h-screen w-screen fixed left-0 top-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] z-20">
      <div className="bg-secondary p-4 shadow-xl rounded-lg flex items-center">
        <div>
          <h1 className="text-white font-bold text-lg">
            Transfer is in progress!
          </h1>
          <div className="loader mx-auto mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModel;
