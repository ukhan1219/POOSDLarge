import punchingbag from "../../assets/blackpunchingbag.jpeg";
import { Link } from "react-router-dom";

import "./styles.css";

function Blurb() {
  return (
    <div className="content-login">
      <div className="header-row">
        <h1>Fit</h1>
        <Link to="/" className="home-button">
          ← Back to website
        </Link>
      </div>
      <img src={punchingbag} className="punchingbag"></img>
    </div>
  );
}

export default Blurb;
