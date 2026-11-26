import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000/api/projects";

    async function loadProjects() {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            setProjects(result.data);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadProjects();
    }, []);

    async function deleteProject(id) {
        if (!window.confirm("Are you sure you want to delete this project?")) {
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

            loadProjects();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="admin-page">
            <h1>Manage Projects</h1>

            <Link to="/admin">Back to Dashboard</Link>
            {" | "}
            <Link to="/admin/projects/add">Add New Project</Link>

            {error && <p>{error}</p>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Completion Date</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.title}</td>

                            <td>
                                {project.completion
                                    ? project.completion.substring(0, 10)
                                    : ""}
                            </td>

                            <td>{project.description}</td>

                            <td>
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        width="100"
                                    />
                                )}
                            </td>

                            <td>
                                <Link to={`/admin/projects/edit/${project.id}`}>
                                    Edit
                                </Link>

                                <button onClick={() => deleteProject(project.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {projects.length === 0 && !error && (
                <p>No projects found.</p>
            )}
        </div>
    );
}