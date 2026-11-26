import { useState, useEffect } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000/api/projects";

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message);
        }

        setProjects(result.data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <main className="page">
      <section className="projects">
        <h1>My Projects</h1>

        <p className="section-intro">
          Here are some projects I have worked on during my studies.
        </p>

        {loading && <p>Loading projects...</p>}

        {error && <p>{error}</p>}

        <div className="projects-grid">

          {projects.map((project) => (
            <div className="project-card" key={project.id}>

              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              ) : (
                <div className="project-placeholder">
                  <span>{project.title}</span>
                </div>
              )}

              <div className="project-content">
                <h2>{project.title}</h2>

                <p style={{ whiteSpace: "pre-line" }}>
                  {project.description}
                </p>

                <p>
                  <strong>Completed:</strong>{" "}
                  {project.completion
                    ? project.completion.substring(0, 4)
                    : "Not specified"}
                </p>
              </div>

            </div>
          ))}

        </div>

        {!loading && !error && projects.length === 0 && (
          <p>No projects available.</p>
        )}

      </section>
    </main>
  );
}

export default Projects;