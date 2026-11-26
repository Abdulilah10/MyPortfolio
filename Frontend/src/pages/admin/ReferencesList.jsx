import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ReferencesList() {
    const [references, setReferences] = useState([]);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000/api/references";

    async function loadReferences() {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message);
            }

            setReferences(result.data);
            setError("");

        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadReferences();
    }, []);

    async function deleteReference(id) {
        if (!window.confirm("Are you sure you want to delete this reference?")) {
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

            loadReferences();

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="admin-page">
            <h1>Manage References</h1>

            <Link to="/admin">Back to Dashboard</Link>
            {" | "}
            <Link to="/admin/references/add">Add New Reference</Link>

            {error && <p>{error}</p>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Testimonial</th>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {references.map((reference) => (
                        <tr key={reference.id}>
                            <td>{reference.name}</td>
                            <td>{reference.testimonial}</td>
                            <td>{reference.position}</td>
                            <td>{reference.company}</td>
                            <td>
                                <Link to={`/admin/references/edit/${reference.id}`}>
                                    Edit
                                </Link>

                                <button onClick={() => deleteReference(reference.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {references.length === 0 && !error && (
                <p>No references found.</p>
            )}
        </div>
    );
}