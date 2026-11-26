import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProject() {
    const navigate = useNavigate();

    const [project, setProject] = useState({
        title: "",
        completion: "",
        description: "",
        image: ""
    });

    const [error, setError] = useState("");

    const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/projects";

    function handleChange(event) {
        setProject({
            ...project,
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
                body: JSON.stringify(project)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            navigate("/admin/projects");

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="admin-page">
            <h1>Add New Project</h1>

            {error && <p>{error}</p>}

            <form className="admin-form" onSubmit={handleSubmit}>

                <label>Project Title</label>
                <input
                    type="text"
                    name="title"
                    value={project.title}
                    onChange={handleChange}
                    required
                />

                <label>Completion Date</label>
                <input
                    type="date"
                    name="completion"
                    value={project.completion}
                    onChange={handleChange}
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={project.description}
                    onChange={handleChange}
                    rows="5"
                    required
                />

                <label>Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={project.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                />

                <button type="submit">Add Project</button>

                <Link to="/admin/projects">Cancel</Link>

            </form>
        </div>
    );
}