import React, { useState } from "react";
import "./styles.css";
import "./inputstyles.css";
import defaultIcon from "../../assets/defaultIcon.png";

export default function ProfileHeader() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("John Doe"); // Replace with dynamic data from props or context.

  const handleSaveName = () => {
    // Save name logic here (e.g., API call).
    setIsEditingName(false);
  };

  return (
    <div className="profile-header">
      {/* Profile Image */}
      <div className="profile-image">
        <img
          src={defaultIcon} // Use the imported image
          alt="Profile"
        />
      </div>

      {/* Name Inputs */}
      <div className="name-inputs">
        {isEditingName ? (
          <>
            <input
              type="text"
              className="rounded-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSaveName} className="rounded-input">
              Save
            </button>
            <button
              onClick={() => setIsEditingName(false)}
              className="rounded-input"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span>{name}</span>
          </>
        )}
      </div>
    </div>
  );
}
