// import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import EditForm from "./EditProfile.tsx";

export default function Form() {
  return (
    <div>
      <div className="profile-form-wrapper">
        <Link to="/dashboard" className="home-button">
          ← Back to website
        </Link>

        <EditForm />
      </div>
    </div>
  );
}
