import React from "react";
import './inputstyles.css';
import ProfileHeader from './ProfileHeader.tsx';

export default function ProfileForm() {
    return (
        <div className="profile-form-container">
            <ProfileHeader />

            {/* Height */}
            <div className="form-row">
                <label htmlFor="height" className="form-label">Height:</label>
                <input
                    id="height"
                    type="number"
                    className="rounded-input"
                    placeholder=""
                />
            </div>

            {/* Weight */}
            <div className="form-row">
                <label htmlFor="weight" className="form-label">Weight:</label>
                <input
                    id="weight"
                    type="number"
                    className="rounded-input"
                    placeholder=""
                />
            </div>

            {/* Email */}
            <div className="form-row">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    id="email"
                    type="email"
                    className="rounded-input"
                    placeholder=""
                />
            </div>

            {/* Current password */}
            <div className="form-row">
                <label htmlFor="current-password" className="form-label">Current Password:</label>
                <input
                    id="current-password"
                    type="password"
                    className="rounded-input"
                    placeholder=""
                />
            </div>

            {/* New password */}
            <div className="form-row">
                <label htmlFor="new-password" className="form-label">New Password:</label>
                <input
                    id="new-password"
                    type="password"
                    className="rounded-input"
                    placeholder=""
                />
            </div>

            {/* Re-type password */}
            <div className="form-row">
                <label htmlFor="retype-password" className="form-label">Re-Type Password:</label>
                <input
                    id="retype-password"
                    type="password"
                    className="rounded-input"
                    placeholder=""
                />
            </div>
        </div>
    );
}
