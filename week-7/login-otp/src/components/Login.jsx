import React from "react";
import "./Login.css";
import { useState } from "react";
import OtpEnter from "./OtpEnter";

const Login = () => {
  const [phoneNumner, setPhoneNumner] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  return !otpSent ? (
    <div className="login-div">
      <h1>Login via OTP</h1>
      <input
        type="text"
        value={phoneNumner}
        onChange={(e) => {
          setPhoneNumner(e.target.value);
        }}
        maxLength={10}
        name=""
        id=""
      />
      <button
        onClick={() => {
          if (phoneNumner.length !== 10) {
            return alert("Enter correct phone no.");
          }

          setOtpSent(true);
        }}
      >
        Send OTP
      </button>
    </div>
  ) : (
    <OtpEnter phoneNo={phoneNumner} />
  );
};

export default Login;
