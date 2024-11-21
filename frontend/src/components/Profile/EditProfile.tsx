import React from "react";
import './inputstyles.css';
import ProfileHeader from './profileHeader.tsx';

export default function ProfileForm() {
    return (
        <div style={{ 
            padding: "1rem", 
            fontFamily: "Arial, sans-serif" 
            }}>

            <ProfileHeader />

            {/* height  */}
            <div className="form-row">
                <label htmlFor="height" className="form-label">Height:</label>
                <input
                    id="height"
                    type="number"
                    className="rounded-input"
                    placeholder=""
                />
            </div>
            <br />

            {/* weight */}
            <div className="form-row">
                <label htmlFor="weight" className="form-label">Weight:</label>
                <input
                    id="weight"
                    type="number"
                    className="rounded-input"
                    placeholder=""
                />
            </div>
            <br />

            {/* email  */}
            <div className="form-row">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    id="email"
                    type="email"
                    className="rounded-input"
                    placeholder=""
                />
            </div>
            <br />

            {/* current password */}
            <div className="form-row">
                <label htmlFor="current-password" className="form-label">Current Password:</label>
                <input
                    id="current-password"
                    type="password"
                    className="rounded-input"
                    placeholder=""
                />
            </div>
            <br />

            {/* new password */}
            <div className="form-row">
                <label htmlFor="new-password" className="form-label">New Password:</label>
                <input
                    id="new-password"
                    type="password"
                    className="rounded-input"
                    placeholder=""
                />
            </div>
            <br />

            {/* retype password */}
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