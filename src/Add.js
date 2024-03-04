import React, { useState } from "react";
import TextInput from "./components/TextInput";

import "./App.css";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobileNumberRegex = /^[0-9]{7,10}$/;

const Add = () => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
  });
  const [isValid, setIsValid] = useState({ mobileNumber: true, email: true });

  const addPress = async (props) => {
    try {
      const response = await fetch("https://resize-full-stack-task.onrender.com/api/data/add", {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type of the request body
        },
        body: JSON.stringify(props), // Convert data to JSON string
      });

      const responseData = await response.json(); // Parse response data as JSON
      console.log(responseData);
      if (responseData?.code == 201) {
        alert("Data added successfully!");
        setUserDetail({
          name: "",
          email: "",
          mobileNumber: "",
          address: "",
        }); 
      }
    } catch (error) {
      alert(error); // Update state with error
    }
  };

  return (
    <div className="add_container">
      <TextInput
        value={userDetail?.name}
        onChangeText={(event) => {
          setUserDetail({ ...userDetail, name: event.target.value });
        }}
        placeholder={"Enter name..."}
      />
      <TextInput
        value={userDetail?.email}
        onChangeText={(event) => {
          const email = event.target.value.trim();
          setUserDetail({ ...userDetail, email: email });
        }}
        placeholder={"xyz@gmail.com"}
        showError={isValid?.email ? "" : "invalid"}
        handleBlur={() => {
          console.log("email======", emailRegex.test(userDetail?.email));
          setIsValid({
            mobileNumber: isValid?.mobileNumber,
            email:
              userDetail?.email?.length > 0
                ? emailRegex.test(userDetail?.email)
                : true,
          });
        }}
        handleFocus={() => {
          setIsValid({ ...isValid, email: true });
        }}
      />
      {!isValid?.email && (
        <p className="error-message">Please enter a valid email</p>
      )}
      <TextInput
        value={userDetail?.mobileNumber}
        onChangeText={(event) => {
          const number = event.target.value.trim();
          const mobileNumberRegex = /^[0-9]+$/;
          console.log("mobile number======", mobileNumberRegex.test(number));
          setUserDetail({
            ...userDetail,
            mobileNumber: mobileNumberRegex.test(number) ? number.slice(0, 10) : "",
          });
        }}
        placeholder={"Enter mobile number"}
        showError={isValid?.mobileNumber ? "" : "invalid"}
        handleBlur={() => {
          console.log(
            "mobile number======",
            mobileNumberRegex.test(userDetail?.mobileNumber)
          );
          setIsValid({
            email: isValid?.email,
            mobileNumber:
              userDetail?.mobileNumber?.length > 0
                ? mobileNumberRegex.test(userDetail?.mobileNumber)
                : true,
          });
        }}
        handleFocus={() => {
          console.log(
            "mobile number======",
            mobileNumberRegex.test(userDetail?.mobileNumber)
          );
          setIsValid({
            ...isValid,
            mobileNumber: userDetail?.mobileNumber?.length <= 10 ? true : false,
          });
        }}
      />
      {!isValid?.mobileNumber && (
        <p className="error-message">Please enter a valid mobile number</p>
      )}
      <TextInput
        value={userDetail?.address}
        onChangeText={(event) => {
          setUserDetail({ ...userDetail, address: event.target.value });
        }}
        placeholder={"Enter address"}
      />

      <button
        className="button"
        onClick={() => {
          addPress(userDetail);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Add;
