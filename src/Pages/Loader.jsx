import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-20 border-t-white"></div>
    </div>
  );
};

export default Loader;