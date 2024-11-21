//import React from "react";
import "./styles.css"; 
import "./inputstyles.css";
import defaultIcon from '../../assets/defaultIcon.png'; 

export default function ProfileHeader() {
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
                <input
                    type="text"
                    className="rounded-input"
                    placeholder="John"
                />
                <input
                    type="text"
                    className="rounded-input"
                    placeholder="Doe"
                />
            </div>
        </div>
    );
}
