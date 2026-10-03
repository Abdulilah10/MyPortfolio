import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import References from './pages/References'
import Contact from './pages/Contact'
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
      </Routes>
    </BrowserRouter>
  )
}

export default App