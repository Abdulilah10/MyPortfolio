import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Portfolio Admin Dashboard.</p>

            <div className="admin-grid">
                <Link to="/admin/users">Manage Users</Link>
                <Link to="/admin/projects">Manage Projects</Link>
                <Link to="/admin/services">Manage Services</Link>
                <Link to="/admin/references">Manage References</Link>
            </div>
        </div>
    );
}