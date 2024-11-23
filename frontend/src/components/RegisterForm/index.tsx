import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // validate email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //  validate phone number
  const isValidPhone = (phone: string) => {
    const phoneDigits = phone.replace(/\D/g, "");
    return phoneDigits.length === 10;
  };

  // format phone number
  const formatPhoneNumber = (value: string) => {
    const phoneDigits = value.replace(/\D/g, "");
    if (phoneDigits.length <= 3) {
      return phoneDigits;
    } else if (phoneDigits.length <= 6) {
      return `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3)}`;
    } else {
      return `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 10)}`;
    }
  };

  // submit form, handle errors
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!isValidEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    try {
      // TODO CHANGE API URL WHEN PUSHED TO PROD
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Registration failed");
        console.error("Registration failed:", data.message);
        return;
      }

      setSuccess(true);
      console.log("User registered successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  return (
    <div className="register-form-container">
      <h1 className="register-title">Create an Account</h1>
      <p className="login-text">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full-name">Full Name</label>
          <input
            type="text"
            id="full-name"
            placeholder="Enter your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="(xxx) xxx-xxxx"
            required
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">
            Registration successful! Redirecting to login...
          </p>
        )}
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
