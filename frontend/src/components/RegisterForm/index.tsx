import { Link } from "react-router-dom";
import "./styles.css";

function RegisterForm() {
  return (
    <div className="register-form-container">
      <h1 className="register-title">Create an Account</h1>
      <p className="login-text">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="full-name">Full Name</label>
          <input
            type="text"
            id="full-name"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
