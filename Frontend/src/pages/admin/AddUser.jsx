import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000/api/users";

    function handleChange(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            navigate("/admin/users");

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="admin-page">
            <h1>Add New User</h1>

            {error && <p>{error}</p>}

            <form className="admin-form" onSubmit={handleSubmit}>

                <label>First Name</label>
                <input
                    type="text"
                    name="firstname"
                    value={user.firstname}
                    onChange={handleChange}
                    required
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    value={user.lastname}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add User</button>

                <Link to="/admin/users">Cancel</Link>

            </form>
        </div>
    );
}