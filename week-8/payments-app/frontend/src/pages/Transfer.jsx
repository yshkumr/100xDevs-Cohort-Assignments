import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Transfer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [transferAmount, setTransferAmount] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const amount = parseInt(transferAmount);
    if (isNaN(amount)) {
      return alert("Invalid Amount");
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        { to: id, amount: amount },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Transaction Sucessful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg border-2 border-gray-100 rounded-md p-8 w-[400px]">
        <h1 className="text-3xl font-bold text-center">Send Money</h1>
        <div className="mt-16 flex gap-3 items-center mb-5">
          <div className="w-12 h-12 bg-green-500 rounded-full flex justify-center items-center">
            <p className="text-2xl font-bold text-white">
              {name[0].toUpperCase()}
            </p>
          </div>
          <p className="text-xl font-bold">{name}</p>
        </div>

        <div className="flex flex-col gap-5">
          <InputBox
            label={"Amount (in Rs)"}
            placeholder={"Enter Amount"}
            onChange={(e) => {
              setTransferAmount(e.target.value);
            }}
          />
          <button
            className="bg-[#21C55D] text-white p-2 rounded-md font-semibold"
            onClick={handleSubmit}
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
