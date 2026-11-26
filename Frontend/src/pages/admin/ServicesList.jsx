import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ServicesList() {
    const [services, setServices] = useState([]);
    const [error, setError] = useState("");

    const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/services";

    async function loadServices() {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            setServices(result.data);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadServices();
    }, []);

    async function deleteService(id) {
        if (!window.confirm("Are you sure you want to delete this service?")) {
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

            loadServices();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="admin-page">
            <h1>Manage Services</h1>

            <Link to="/admin">Back to Dashboard</Link>
            {" | "}
            <Link to="/admin/services/add">Add New Service</Link>

            {error && <p>{error}</p>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.title}</td>
                            <td>{service.description}</td>
                            <td>
                                <Link to={`/admin/services/edit/${service.id}`}>
                                    Edit
                                </Link>

                                <button onClick={() => deleteService(service.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {services.length === 0 && !error && (
                <p>No services found.</p>
            )}
        </div>
    );
}