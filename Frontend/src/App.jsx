import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import References from './pages/References'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import UsersList from './pages/admin/UsersList'
import AddUser from './pages/admin/AddUser'
import EditUser from './pages/admin/EditUser'
import ProjectsList from './pages/admin/ProjectsList'
import AddProject from './pages/admin/AddProject'
import EditProject from './pages/admin/EditProject'
import ServicesList from "./pages/admin/ServicesList";
import AddService from "./pages/admin/AddService";
import EditService from "./pages/admin/EditService";
import logo from './assets/logo.png'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={logo} alt="Abdulilah Ahmedin Logo" />
          </Link>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Me</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/services">Services</Link>
            <Link to="/references">References</Link>
            <Link to="/contact">Contact Me</Link>
            <Link to="/admin">Admin Dashboard</Link>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/references" element={<References />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/users/edit/:id" element={<EditUser />} />
        <Route path="/admin/projects" element={<ProjectsList />} />
        <Route path="/admin/projects/add" element={<AddProject />} />
        <Route path="/admin/projects/edit/:id" element={<EditProject />} />
        <Route path="/admin/services" element={<ServicesList />} />
        <Route path="/admin/services/add" element={<AddService />} />
        <Route path="/admin/services/edit/:id" element={<EditService />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App