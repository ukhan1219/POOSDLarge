import React from "react";
import './styles.css';
import { Link } from 'react-router-dom';
import EditForm from './EditProfile.tsx';

export function form() {
    return (
        <div className="profile-background">
        
        {/* This is for the box holding everything  */}
        <div style={{
            position: "relative",
            background: "#323333",
            padding: "2rem",
            margin: "7rem",
            borderRadius: "30px",
            fontFamily: "JetBrains Mono",
            top: "10px",
            height: "680px",
            width: "500px",
        }}>

        <Link to="/" className="home-button">
            ← Back to website
        </Link>

        <EditForm />
        <form>
            <div style={{ 
                marginTop: "1rem", 
                display: "flex", 
                gap: ".5rem"
                }}>
            
            </div>
        </form>
        </div>
    </div>
    )
}

export default form; 