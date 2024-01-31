import React from "react";

const UserProfile = ({ name, letter, className }) => {
  return (
    <div className={className}>
      <p className="text-lg font-medium">{name}</p>
      <div className="w-10 h-10 bg-[#e1e3ef] rounded-full flex items-center justify-center">
        <p className="text-lg">{letter}</p>
      </div>
    </div>
  );
};

export default UserProfile;
