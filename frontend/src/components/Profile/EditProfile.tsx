import React, { useState, useEffect } from "react";
import "./inputstyles.css";
import { useAuth } from "../../authentication";
import ProfileHeader from "./ProfileHeader";

export default function ProfileForm() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    Email: "",
    Name: "",
  });
  const [healthInfo, setHealthInfo] = useState({
    HeightCM: "",
    Weight: "",
    BMI: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      console.error("User ID is undefined. Cannot fetch data.");
      return;
    }

    console.log("Fetching data for userID:", userId);

    async function fetchData() {
      try {
        const [userResponse, healthResponse] = await Promise.all([
          fetch(`https://group9.xyz:3000/api/getuser/${userId}`),
          fetch(`https://group9.xyz:3000/api/gethealthinfo/${userId}`),
        ]);

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("User data fetched:", userData);
          setUserInfo((prevState) => ({ ...prevState, ...userData }));
        } else {
          console.warn("Failed to fetch user data.");
        }

        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          console.log("Health data fetched:", healthData);
          setHealthInfo((prevState) => ({ ...prevState, ...healthData }));
        } else {
          console.warn("Failed to fetch health data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "Email") {
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setHealthInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const calculateBMI = () => {
    const heightInMeters = healthInfo.HeightCM / 100;
    const bmi =
      healthInfo.HeightCM && healthInfo.Weight
        ? (healthInfo.Weight / (heightInMeters * heightInMeters)).toFixed(2)
        : "N/A";
    return bmi;
  };

  const handleSave = async () => {
    const updatedUserInfo = {
      email: userInfo.Email,
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined,
    };

    const updatedHealthInfo = {
      HeightCM: parseFloat(healthInfo.HeightCM) || "",
      Weight: parseFloat(healthInfo.Weight) || "",
      BMI: calculateBMI(),
    };

    try {
      const userResponse = await fetch(
        `https://group9.xyz:3000/api/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserInfo),
        },
      );

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || "Failed to update user info.");
      }

      console.log("User info updated successfully.");

      const refreshedUserResponse = await fetch(
        `https://group9.xyz:3000/api/getuser/${userId}`,
      );
      if (refreshedUserResponse.ok) {
        const refreshedUserData = await refreshedUserResponse.json();
        setUserInfo((prevState) => ({
          ...prevState,
          Email: refreshedUserData.Email,
        }));
      }

      const healthResponse = await fetch(
        `https://group9.xyz:3000/api/HealthInfo/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedHealthInfo),
        },
      );

      if (!healthResponse.ok) {
        throw new Error("Failed to update health info.");
      }

      const savedData = await healthResponse.json();
      console.log("Health info updated successfully:", savedData);

      setHealthInfo((prevState) => ({ ...prevState, ...updatedHealthInfo }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  const bmi = calculateBMI();

  return (
    <div className="profile-form-container">
      <ProfileHeader />

      <div className="form-row">
        <label className="form-label">Email:</label>
        {isEditing ? (
          <input
            className="rounded-input"
            name="Email"
            type="email"
            value={userInfo.Email}
            onChange={handleInputChange}
          />
        ) : (
          <span className="read-only-text">{userInfo?.Email || "N/A"}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-label">Password:</label>
        {isEditing ? (
          <div className="password-inputs">
            <input
              className="rounded-input"
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              className="rounded-input"
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        ) : (
          <span className="read-only-text">******</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-label">Height (cm):</label>
        {isEditing ? (
          <input
            className="rounded-input"
            name="HeightCM"
            type="number"
            value={healthInfo.HeightCM}
            onChange={handleInputChange}
          />
        ) : (
          <span className="read-only-text">
            {healthInfo?.HeightCM || "N/A"}
          </span>
        )}
      </div>

      <div className="form-row">
        <label className="form-label">Weight (kg):</label>
        {isEditing ? (
          <input
            className="rounded-input"
            name="Weight"
            type="number"
            value={healthInfo.Weight}
            onChange={handleInputChange}
          />
        ) : (
          <span className="read-only-text">{healthInfo?.Weight || "N/A"}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-label">BMI:</label>
        <span className="read-only-text">{bmi}</span>
      </div>

      <div className="form-row button-group">
        {isEditing ? (
          <>
            <button className="btn btn-save" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-cancel" onClick={handleEditToggle}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-edit" onClick={handleEditToggle}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
