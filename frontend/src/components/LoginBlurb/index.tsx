import punchingbag from "../../assets/blackpunchingbag.jpeg";
import { Link } from "react-router-dom";

import "./styles.css";

function LoginBlurb() {
  return (
    <div className="content-login">
      <div className="header-row">
        <h1>Fit</h1>
        <Link to="/" className="home-button">
          <p className="home-btn-text">
            Back to website -&gt;
          </p>
        </Link>
      </div>
      <img src={punchingbag} className="punchingbag"></img>
    </div>
  );
}

export default LoginBlurb;
