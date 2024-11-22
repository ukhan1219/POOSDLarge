import { Link } from "react-router-dom";
import "./styles.css";

function LoginForm() {
  return (
    <div className="login-form-container">
      <h1 className="login-title">Login</h1>
      <p className="register-text">
        Don't have an account?{" "}
        <Link to="/register" className="register-link">
          Register
        </Link>
      </p>
      <form className="login-form">
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
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
