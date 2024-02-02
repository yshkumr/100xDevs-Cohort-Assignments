import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "../components/UserProfile";
import Users from "../components/Users";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const headers = { authorization: localStorage.getItem("token") };

      const [userResponse, accountResponse] = await Promise.all([
        axios.get("http://localhost:3000/api/v1/user/userInfo", {
          headers,
        }),
        axios.get("http://localhost:3000/api/v1/account/balance", { headers }),
      ]);

      setUser(userResponse.data);
      setBalance(accountResponse.data.balance);
    };
    getUser();
  }, []);

  const firstName = user.firstName || "";
  return (
    <div className="mb-10">
      <div className=" w-full border-b-2 py-4">
        <div className="flex justify-between max-w-[95%] mx-auto">
          <p className="text-2xl font-bold">Payments App</p>
          <UserProfile
            name={"Hello, " + user.firstName}
            letter={firstName[0]?.toUpperCase()}
            className={"flex items-center gap-3 flex-row"}
          />
          <Button
            label={"Log Out"}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          />
        </div>
      </div>

      <div className="max-w-[95%] mx-auto my-6">
        <p className="text-lg font-bold">
          Your Balance Rs {balance.toFixed(2)}
        </p>
      </div>

      <Users />
    </div>
  );
};

export default Dashboard;
