import React from "react";
import "./styles.css";
import "./inputstyles.css";
import defaultIcon from "../../assets/defaultIcon.png";

export default function ProfileHeader() {
  const name = "John Doe";
  // TODO UPDATE WITH REAL NAME
  return (
    <div className="profile-header">
      <div className="profile-image">
        <img src={defaultIcon} alt="Profile" />
      </div>

      <div className="name-display">
        <span className="read-only-text">{name}</span>
      </div>
    </div>
  );
}
