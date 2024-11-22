// import React from "react";
import './styles.css';
import { Link } from 'react-router-dom';
import EditForm from './EditProfile.tsx';

export default function Form() {
    return (
        <div>
            {/* Box holding everything */}
            <div className="profile-form-wrapper">
                <Link to="/" className="home-button">
                    ← Back to website
                </Link>

                <EditForm />

                {/* If you have additional content or buttons, include them here */}
                <form>
                    <div className="form-footer">
                        {/* Content here */}
                    </div>
                </form>
            </div>
        </div>
    );
}
