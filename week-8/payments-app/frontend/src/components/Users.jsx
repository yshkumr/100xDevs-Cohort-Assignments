import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import UserProfile from "./UserProfile";
import Button from "./Button";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  const loadUsers = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setUsers(response.data.users);
  };

  useEffect(() => {
    loadUsers();
  }, [filter]);

  return (
    <div className="max-w-[95%] mx-auto ">
      <div>
        <p className="text-lg font-bold">Users</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Users..."
          className="w-full p-2 rounded-md outline-none border-2 border-gray-300 mt-5"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {users.map((user) => (
          <div
            className="flex items-center gap-3 justify-between "
            key={user._id}
          >
            <div className="flex flex-row items-center gap-3">
              <UserProfile
                name={user.firstName + " " + user.lastName}
                letter={user.firstName[0].toUpperCase()}
                className={"flex items-center gap-3 flex-row-reverse"}
              />
            </div>
            <Button
              label={"Send Money"}
              onClick={(e) => {
                navigate(
                  "/transfer?id=" + user._id + "&name=" + user.firstName
                );
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
