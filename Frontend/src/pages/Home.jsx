import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Welcome to My <span>Portfolio</span>
          </h1>

          <p className="hero-description">
            Hi, I'm Abdulilah Ahmedin. I'm a Software Engineering student
            interested in programming, web development, and technology.
          </p>

          <p className="hero-description">
            My goal is to continue improving my technical skills and create
            useful, user-friendly applications.
          </p>

          <div className="hero-buttons">
            <Link to="/about" className="primary-button">
              Learn More About Me
            </Link>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="code-card">
            <span className="code-dot"></span>
            <span className="code-dot"></span>
            <span className="code-dot"></span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home