import React, { useState } from 'react';
import './registerPage.css';

function RegisterPage() {
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Password: '',
        Phone: '',
        ID: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Registration successful!');
                setFormData({
                    Name: '',
                    Email: '',
                    Password: '',
                    Phone: '',
                    ID: ''
                });
            } else {
                setMessage(result.error || 'Failed to register. Please try again.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="Name">Full Name</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Phone">Phone</label>
                    <input
                        type="tel"
                        id="Phone"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ID">User ID</label>
                    <input
                        type="number"
                        id="ID"
                        name="ID"
                        value={formData.ID}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default RegisterPage;