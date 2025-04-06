
import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-med-blue-500 to-med-green-500 flex items-center justify-center text-white font-bold text-xl">MS</div>
      <span className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-med-blue-700 to-med-green-700">MedScribe</span>
    </div>
  );
};
