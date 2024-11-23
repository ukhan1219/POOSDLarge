import React from "react";
import "./styles.css";
import "./inputstyles.css";
import defaultIcon from "../../assets/defaultIcon.png";
import { useAuth } from "../../authentication";

export default function ProfileHeader() {
  const { user } = useAuth();

  return (
    <div className="profile-header">
      <div className="profile-image">
        <img src={defaultIcon} alt="Profile" />
      </div>

      <div className="name-display">
        <span className="read-only-text">{user?.name || "Guest"}</span>
      </div>
    </div>
  );
}
