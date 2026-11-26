import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditReference() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [reference, setReference] = useState({
        name: "",
        testimonial: "",
        position: "",
        company: ""
    });

    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    const API_URL = "http://localhost:3000/api/references";

    useEffect(() => {
        async function loadReference() {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message);
                }

                setReference({
                    name: result.data.name,
                    testimonial: result.data.testimonial,
                    position: result.data.position,
                    company: result.data.company
                });

                setLoaded(true);

            } catch (err) {
                setError(err.message);
            }
        }

        loadReference();
    }, [id]);

    function handleChange(event) {
        setReference({
            ...reference,
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
            <h1>Edit Reference</h1>

            {error && <p>{error}</p>}

            {!loaded && !error && <p>Loading reference...</p>}

            {loaded && (
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

                    <button type="submit">Update Reference</button>

                    <Link to="/admin/references">Cancel</Link>

                </form>
            )}
        </div>
    );
}