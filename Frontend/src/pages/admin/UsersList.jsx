import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/users";

    async function loadUsers() {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            setUsers(result.data);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    async function deleteUser(id) {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            loadUsers();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="admin-page">
            <h1>Manage Users</h1>

            <Link to="/admin">Back to Dashboard</Link>
            {" | "}
            <Link to="/admin/users/add">Add New User</Link>

            {error && <p>{error}</p>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/admin/users/edit/${user.id}`}>
                                    Edit
                                </Link>

                                <button onClick={() => deleteUser(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {users.length === 0 && !error && <p>No users found.</p>}
        </div>
    );
}