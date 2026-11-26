import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddReference() {
    const navigate = useNavigate();

    const [reference, setReference] = useState({
        name: "",
        testimonial: "",
        position: "",
        company: ""
    });

    const [error, setError] = useState("");

    const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/references";

    function handleChange(event) {
        setReference({
            ...reference,
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
                body: JSON.stringify(reference)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            navigate("/admin/references");

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="admin-page">
            <h1>Add New Reference</h1>

            {error && <p>{error}</p>}

            <form className="admin-form" onSubmit={handleSubmit}>

                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={reference.name}
                    onChange={handleChange}
                    required
                />

                <label>Testimonial</label>
                <textarea
                    name="testimonial"
                    value={reference.testimonial}
                    onChange={handleChange}
                    rows="5"
                    required
                />

                <label>Position</label>
                <input
                    type="text"
                    name="position"
                    value={reference.position}
                    onChange={handleChange}
                    required
                />

                <label>Company</label>
                <input
                    type="text"
                    name="company"
                    value={reference.company}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Reference</button>

                <Link to="/admin/references">Cancel</Link>

            </form>
        </div>
    );
}