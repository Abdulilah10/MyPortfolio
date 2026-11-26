import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({
        title: "",
        completion: "",
        description: "",
        image: ""
    });

    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    const API_URL = "http://localhost:3000/api/projects";

    useEffect(() => {
        async function loadProject() {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message);
                }

                setProject({
                    title: result.data.title || "",
                    completion: result.data.completion
                        ? result.data.completion.substring(0, 10)
                        : "",
                    description: result.data.description || "",
                    image: result.data.image || ""
                });

                setLoaded(true);

            } catch (err) {
                setError(err.message);
            }
        }

        loadProject();
    }, [id]);

    function handleChange(event) {
        setProject({
            ...project,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
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
            <h1>Edit Project</h1>

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
                />

                <button type="submit" disabled={!loaded}>
                    Update Project
                </button>

                <Link to="/admin/projects">Cancel</Link>

            </form>
        </div>
    );
}