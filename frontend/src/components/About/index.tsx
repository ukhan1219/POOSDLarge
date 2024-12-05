import NavBar from "../NavBar";
import TeamList from "./team";
import Blurb from "./blurb";
import Carousel from "./carousel"
import DustImage from "../../assets/dustPicture.jpg"

function About()
{
    return(
        <>
            <div className="content-box">
                <Carousel/>
                <img src={DustImage} className="image"></img>
            </div>
            <div className="team-list-wrapper">
                <TeamList/>
            </div>
        </>
    );
}

export default About