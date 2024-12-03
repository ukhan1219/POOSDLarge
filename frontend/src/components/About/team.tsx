import Usmanpfp from "../../assets/ProfilePics/Usmanpfp.jpeg"
import Leopfp from "../../assets/ProfilePics/Leopfp.jpeg"
import Nathanpfp from "../../assets/ProfilePics/Nathanpfp.jpg"
import Louispfp from "../../assets/ProfilePics/Louispfp.png"
import Roypfp from "../../assets/ProfilePics/Roypfp.png"
import Ryanpfp from "../../assets/ProfilePics/Ryanpfp.png"
import Caitpfp from "../../assets/ProfilePics/Caitpfp.jpeg"


import React from 'react'
import "./About.css"
function TeamList(){
    const Members = [
    {name: "Usman", role: "Project Manager", imgsrc: Usmanpfp},
    {name: "Leo", role: "Frontend 1", imgsrc: Leopfp},
    {name: "Nathan", role: "Frontend 2", imgsrc: Nathanpfp},
    {name: "Louis", role: "API 1", imgsrc: Louispfp},
    {name: "Roy", role: "API 2", imgsrc: Roypfp},
    {name: "Ryan", role: "API 3", imgsrc: Ryanpfp},
    {name: "Cait", role: "Database", imgsrc: Caitpfp},
    ];

    return(
        <div className="team-list-container">
            <h1 className="title">Meet the Team:</h1>
            <div className="team-list">
                {Members.map((member,index) =>(
                    <div key = {index} className = "member">
                        <img src={member.imgsrc}/>
                        <div className = "member-info">
                            <h4 className = "member-name">{member.name}</h4>
                            <p className = "member-role">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamList;