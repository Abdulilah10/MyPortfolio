import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/users";

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message);
                }

                setUser({
                    firstname: result.data.firstname,
                    lastname: result.data.lastname,
                    email: result.data.email,
                    password: ""
                });

                setLoaded(true);
            } catch (err) {
                setError(err.message);
            }
        }

        loadUser();
    }, [id]);

    function handleChange(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const updatedUser = { ...user };

        if (updatedUser.password === "") {
            delete updatedUser.password;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
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
            <h1>Edit User</h1>

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

                <label>New Password (Optional)</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                />

                <button type="submit" disabled={!loaded}>
                    Update User
                </button>

                <Link to="/admin/users">Cancel</Link>

            </form>
        </div>
    );
}