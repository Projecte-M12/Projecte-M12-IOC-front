import { Link } from "react-router-dom";

export function CustomerDashboard() {
    return (
        <div>
            <h1>Customer Dashboard</h1>
            <Link to="/login">Login</Link>
        </div>
    );
}