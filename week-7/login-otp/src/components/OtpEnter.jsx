import React from "react";
import { useState, useEffect, useRef } from "react";
import "./OtpEnter.css";

const OtpEnter = ({ phoneNo }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const inputRefs = useRef([]);

  function handleChange(index, value) {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (index < otp.length - 1 && value) {
      inputRefs.current[index + 1].focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  }

  console.log(otp.join(""));

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="otp-div">
      <h1>Enter otp sent to {phoneNo}</h1>

      <div className="inps">
        {otp.map((value, index) => (
          <input
            onChange={(e) => {
              handleChange(index, e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(index, e);
            }}
            ref={(input) => (inputRefs.current[index] = input)}
            key={index}
            maxLength={1}
            type="text"
            name=""
            className="otp-inps"
            value={value}
          />
        ))}
      </div>

      <button>Login</button>
    </div>
  );
};

export default OtpEnter;
