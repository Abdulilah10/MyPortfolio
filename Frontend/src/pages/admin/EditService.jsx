import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditService() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [service, setService] = useState({
        title: "",
        description: ""
    });

    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    const API_URL = "http://localhost:3000/api/services";

    useEffect(() => {
        async function loadService() {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message);
                }

                setService({
                    title: result.data.title,
                    description: result.data.description
                });

                setLoaded(true);

            } catch (err) {
                setError(err.message);
            }
        }

        loadService();
    }, [id]);

    function handleChange(event) {
        setService({
            ...service,
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
            <h1>Edit Service</h1>

            {error && <p>{error}</p>}

            {!loaded && !error && <p>Loading service...</p>}

            {loaded && (
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

                    <button type="submit">Update Service</button>

                    <Link to="/admin/services">Cancel</Link>

                </form>
            )}
        </div>
    );
}