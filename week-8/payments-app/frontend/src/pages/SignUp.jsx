import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

const SignUp = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        firstName,
        lastName,
        email,
        password,
      }
    );

    localStorage.setItem("token", "Bearer " + response.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#cfdfde]">
      <div className="bg-white w-[350px] p-6 rounded-lg">
        <h1 className="text-center text-3xl font-bold">Sign Up</h1>
        <p className="text-center mt-3 text-gray-600">
          Enter your information to create an account
        </p>

        <div className="mt-5 flex flex-col gap-4">
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@email.com"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button label={"Sign Up"} onClick={handleSubmit} />
        </div>

        <div className="flex justify-center mt-4 gap-1 font-semibold">
          <p>Already have an account?</p>
          <Link to="/signin" className=" underline ">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
