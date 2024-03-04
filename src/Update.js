import React, { useEffect, useState } from "react";
import "./App.css";
import TextInput from "./components/TextInput";


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobileNumberRegex = /^[0-9]{7,10}$/;

const Update = () => {
  const [userData, setUserData] = useState([]);
  const [updatecount, setUpdateCount] = useState(0);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    id: "",
  });



  const [isValid, setIsValid] = useState({ mobileNumber: true, email: true });

  const getData = async () => {
    try {
      const response = await fetch("https://resize-full-stack-task.onrender.com/api/data/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log(responseData);
      if (responseData?.code == 200) {
        setUserData([...responseData?.data]);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getData();
  }, [updatecount]); // useEffect will trigger whenever updatecount changes

  const updatePress = async (updatedProps, oldProps, index) => {
    let data = {
      name: updatedProps?.name != "" ? updatedProps?.name : oldProps?.name,
      mobileNumber:
        updatedProps?.mobileNumber != ""
          ? updatedProps?.mobileNumber
          : oldProps?.mobileNumber,
      email: updatedProps?.email != "" ? updatedProps?.email : oldProps?.email,
      address:
        updatedProps?.address != "" ? updatedProps?.address : oldProps?.address,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/data/update/${oldProps?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (responseData?.code == 200) {
        alert("Data updated successfully!");
        setUpdatedData({
          name: "",
          email: "",
          mobileNumber: "",
          address: "",
        });
        let data = userData;
        data.splice(index, 1, { ...responseData?.data });
        setUserData([...data]);
        setUpdateCount(updatecount + 1);
      }
    } catch (error) {
      alert(error);
    }
  };

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(340);

  const handleResize = (e) => {
    setWidth(e.clientX);
    setHeight(e.clientY);
  };

  return (
    <div className="update_container"
    style={{ width: `${width}px`, height: `${height}px` }}
      onClick={handleResize}
    >
     
      <div className="table-container">
     <table className="custom-table">
    <thead>
      <tr>
        <th style={{ width: "100px" }}>Name</th>
        <th style={{ width: "150px" }}>Email</th>
        <th style={{ width: "120px" }}>Mobile Number</th>
        <th style={{ width: "200px" }}>Address</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {userData.map((item, index) => (
        <tr key={index}>
          <td>
            <input
              type="text"
              value={item.name}
              onChange={(e) => {
                const newValue = e.target.value;
                setUserData((prevUserData) => {
                  const updatedUserData = [...prevUserData];
                  updatedUserData[index] = { ...updatedUserData[index], name: newValue };
                  return updatedUserData;
                });
              }}
            />
          </td>
          <td>
            <input
              type="text"
              value={item.email}
              onChange={(e) => {
                const newValue = e.target.value;
                setUserData((prevUserData) => {
                  const updatedUserData = [...prevUserData];
                  updatedUserData[index] = { ...updatedUserData[index], email: newValue };
                  return updatedUserData;
                });
              }}
            />
          </td>
          <td>
            <input
              type="text"
              value={item.mobileNumber}
              onChange={(e) => {
                const newValue = e.target.value;
                setUserData((prevUserData) => {
                  const updatedUserData = [...prevUserData];
                  updatedUserData[index] = { ...updatedUserData[index], mobileNumber: newValue };
                  return updatedUserData;
                });
              }}
            />
          </td>
          <td>
            <input
              type="text"
              value={item.address}
              onChange={(e) => {
                const newValue = e.target.value;
                setUserData((prevUserData) => {
                  const updatedUserData = [...prevUserData];
                  updatedUserData[index] = { ...updatedUserData[index], address: newValue };
                  return updatedUserData;
                });
              }}
            />
          </td>
          <td>
            <button
              className="button"
              onClick={() => {
                updatePress(updatedData, item, index);
              }}
            >
              Update
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>

   
  );
};
export default Update;
