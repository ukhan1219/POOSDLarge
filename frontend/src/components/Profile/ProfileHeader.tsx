import React from "react";
import "./styles.css";
import "./inputstyles.css";
import defaultIcon from "../../assets/defaultIcon.png";

export default function ProfileHeader() {
  const name = "John Doe"; // Replace with dynamic data from props or context.

  return (
    <div className="profile-header">
      {/* Profile Image */}
      <div className="profile-image">
        <img
          src={defaultIcon} // Use the imported image
          alt="Profile"
        />
      </div>

      {/* Display Name */}
      <div className="name-display">
        <span className="read-only-text">{name}</span>
      </div>
    </div>
  );
}
