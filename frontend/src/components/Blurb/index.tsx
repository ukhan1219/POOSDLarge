import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './styles.css'
import React from "react";

interface BlurbProps{
  status: boolean;
}

const Blurb: React.FC<BlurbProps> = ({status}) => {
  console.log("Blurb status:", status);
  const destination = status ? "/calendar" : "/login";
  return (
    < >
      <div className='content'>
        <p className='phrase'>
          Get Fit,
          <br></br>
          Get Strong,
          <br></br>
          Get Healthy!
        </p>
        {/* <p className='message'>
          Welcome to our fitness tracker website designed to help you achieve your goals and transform your body and mind.
        </p> */}
        <Link to={destination} className = "btn-container">Get Started</Link>
      </div>
    </>
  )
}

export default Blurb