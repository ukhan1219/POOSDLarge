import About from "../../components/About";
import NavBar from "../../components/NavBar";

function AboutPage(){
    return(
        <>
        <div className="flexbox-container">
            <NavBar/>
            <About/>
        </div>
        </>
    );
}

export default AboutPage;