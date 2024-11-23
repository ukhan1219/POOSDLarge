import React, { useState, useEffect } from "react";
import "./inputstyles.css";
import { useAuth } from "../../authentication";
import ProfileHeader from "./ProfileHeader";

export default function ProfileForm() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [healthInfo, setHealthInfo] = useState(null);

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
          fetch(`http://localhost:3000/api/getuser/${userId}`),
          fetch(`http://localhost:3000/api/gethealthinfo/${userId}`),
        ]);

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data.");
        }

        if (!healthResponse.ok) {
          throw new Error("Failed to fetch health data.");
        }

        const userData = await userResponse.json();
        const healthData = await healthResponse.json();

        console.log("User data fetched:", userData);
        console.log("Health data fetched:", healthData);

        setUserInfo(userData);
        setHealthInfo(healthData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [userId]);

  if (!userId) {
    return <p>Loading user information...</p>;
  }

  if (!userInfo || !healthInfo) {
    console.error("Missing data: UserInfo or HealthInfo is null.");
    return <p>Failed to load data.</p>;
  }

  const bmi = healthInfo?.BMI ? healthInfo.BMI.toFixed(2) : "N/A";

  return (
    <div className="profile-form-container">
      <ProfileHeader />

      <div className="form-row">
        <label className="form-label">Email:</label>
        <span className="read-only-text">{userInfo?.Email || "N/A"}</span>
      </div>

      <div className="form-row">
        <label className="form-label">Password:</label>
        <span className="read-only-text">******</span>
      </div>

      <div className="form-row">
        <label className="form-label">Height (cm):</label>
        <span className="read-only-text">{healthInfo?.HeightCM || "N/A"}</span>
      </div>

      <div className="form-row">
        <label className="form-label">Weight (kg):</label>
        <span className="read-only-text">{healthInfo?.Weight || "N/A"}</span>
      </div>

      <div className="form-row">
        <label className="form-label">BMI:</label>
        <span className="read-only-text">{bmi}</span>
      </div>
    </div>
  );
}
