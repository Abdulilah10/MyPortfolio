import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddService() {
    const navigate = useNavigate();

    const [service, setService] = useState({
        title: "",
        description: ""
    });

    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000/api/services";

    function handleChange(event) {
        setService({
            ...service,
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
                body: JSON.stringify(service)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            navigate("/admin/services");

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="admin-page">
            <h1>Add New Service</h1>

            {error && <p>{error}</p>}

            <form className="admin-form" onSubmit={handleSubmit}>

                <label>Service Title</label>
                <input
                    type="text"
                    name="title"
                    value={service.title}
                    onChange={handleChange}
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={service.description}
                    onChange={handleChange}
                    rows="5"
                    required
                />

                <button type="submit">Add Service</button>

                <Link to="/admin/services">Cancel</Link>

            </form>
        </div>
    );
}