import React, { useState, useEffect } from "react";
import "./inputstyles.css";
import ProfileHeader from "./ProfileHeader";
// TODO CONNECT TO API
export default function ProfileForm() {
  const [userData, setUserData] = useState({
    email: "",
    height: "",
    weight: "",
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  // bmi calculation
  const [bmi, setBmi] = useState(null);
  // TODO UPDATE WITH USER ID WHEN LOGGED IN
  const userId = 1;

  useEffect(() => {
    async function fetchUserData() {
      try {
        // TODO CHANGE API URL WHEN PUSHED TO PROD
        const response = await fetch(
          `http://localhost:3000/api/user/${userId}`,
        );
        if (!response.ok) throw new Error("Failed to fetch user data.");
        const data = await response.json();
        setUserData({
          email: data.Email,
          height: data.HeightCM || "",
          weight: data.Weight || "",
          currentPassword: "",
          newPassword: "",
          retypePassword: "",
        });
        calculateBMI(data.Weight, data.HeightCM);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchUserData();
  }, []);

  // input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  // calculate bmi
  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const bmiValue = (weight / (height / 100) ** 2).toFixed(2);
      setBmi(bmiValue);
    } else {
      setBmi(null);
    }
  };

  // edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // save edits
  const handleSave = async () => {
    if (userData.newPassword !== userData.retypePassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          currentPassword: userData.currentPassword,
          newPassword: userData.newPassword,
        }),
      });

      if (!response.ok) throw new Error("Failed to update user data.");

      const data = await response.json();
      alert(data.message);
      setIsEditing(false);
      setUserData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        retypePassword: "",
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="profile-form-container">
      <ProfileHeader />

      {/* Height */}
      <div className="form-row">
        <label htmlFor="height" className="form-label">
          Height (cm):
        </label>
        {isEditing ? (
          <input
            id="height"
            type="number"
            className="rounded-input"
            value={userData.height}
            onChange={(e) => {
              handleChange(e);
              calculateBMI(userData.weight, e.target.value);
            }}
          />
        ) : (
          <span className="read-only-text">{userData.height || "N/A"} cm</span>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="weight" className="form-label">
          Weight (kg):
        </label>
        {isEditing ? (
          <input
            id="weight"
            type="number"
            className="rounded-input"
            value={userData.weight}
            onChange={(e) => {
              handleChange(e);
              calculateBMI(e.target.value, userData.height);
            }}
          />
        ) : (
          <span className="read-only-text">{userData.weight || "N/A"} kg</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="bmi" className="form-label">
          BMI:
        </label>
        <span className="read-only-text">{bmi || "N/A"}</span>
      </div>

      {/* Email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        {isEditing ? (
          <input
            id="email"
            type="email"
            className="rounded-input"
            value={userData.email}
            onChange={handleChange}
          />
        ) : (
          <span className="read-only-text">{userData.email || "N/A"}</span>
        )}
      </div>

      {isEditing && (
        <>
          <div className="form-row">
            <label htmlFor="currentPassword" className="form-label">
              Current Password:
            </label>
            <input
              id="currentPassword"
              type="password"
              className="rounded-input"
              value={userData.currentPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="newPassword" className="form-label">
              New Password:
            </label>
            <input
              id="newPassword"
              type="password"
              className="rounded-input"
              value={userData.newPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="retypePassword" className="form-label">
              Re-type New Password:
            </label>
            <input
              id="retypePassword"
              type="password"
              className="rounded-input"
              value={userData.retypePassword}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <div className="form-footer">
        <button onClick={toggleEdit} className="rounded-input">
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button onClick={handleSave} className="rounded-input">
            Save
          </button>
        )}
      </div>
    </div>
  );
}
