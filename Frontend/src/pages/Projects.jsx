import jiraProject from "../assets/jira-project.jpg";
import carDealership from "../assets/car-dealership.jpg";

function Projects() {
  return (
    <main className="page">
      <section className="projects">
        <h1>My Projects</h1>

        <p className="section-intro">
          Here are some projects I have worked on during my studies.
        </p>

        <div className="projects-grid">

          {/* Project 1 */}
          <div className="project-card">
            <div className="project-placeholder">
              <span>Project Documentation</span>
            </div>

            <div className="project-content">
              <h2>Student Budget Tracker</h2>

              <p>
                A software project designed to help students manage their
                income, expenses, categories, budget goals, and financial
                notifications.
              </p>

              <p>
                <strong>Role:</strong> Requirements analysis and system design
              </p>

              <p>
                <strong>Outcome:</strong> Created requirements, use cases,
                activity diagrams, class diagrams, and other system models.
              </p>

              <p>
                <strong>Completed:</strong> 2025
              </p>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card">
            <div className="project-placeholder">
              <span>Web Development</span>
            </div>

            <div className="project-content">
              <h2>Web Development Project</h2>

              <p>
                A website created using HTML and CSS as part of my web
                development studies.
              </p>

              <p>
                <strong>Role:</strong> Website design and development
              </p>

              <p>
                <strong>Outcome:</strong> Built and organized web pages and
                uploaded the completed website to a web server using FileZilla.
              </p>

              <p>
                <strong>Completed:</strong> 2025
              </p>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card">
            <img
              src={jiraProject}
              alt="Jira backlog for Sports Store Website project"
              className="project-image"
            />

            <div className="project-content">
              <h2>Sports Store Website</h2>

              <p>
                A team web development project for an online sports store
                selling products such as shirts, balls, and other sports items.
              </p>

              <p>
                <strong>Role:</strong> Project planning and web development
              </p>

              <p>
                <strong>Outcome:</strong> Used Jira to organize user stories,
                priorities, estimates, and tasks for customers, managers,
                administrators, and other user roles.
              </p>

              <p>
                <strong>Completed:</strong> 2025
              </p>
            </div>
          </div>

          {/* Project 4 */}
          <div className="project-card">
            <img
              src={carDealership}
              alt="Car Dealership Web Application"
              className="project-image"
            />

            <div className="project-content">
              <h2>Car Dealership Web Application</h2>

              <p>
                A web application designed to support buying and selling cars
                online, including vehicle listings, customer accounts, test
                drive scheduling, and customer inquiries.
              </p>

              <p>
                <strong>Role:</strong> Team project planning and web development
              </p>

              <p>
                <strong>Outcome:</strong> Developed a car dealership web
                application with different user roles including buyers,
                sellers, and administrators.
              </p>

              <p>
                <strong>Completed:</strong> 2025
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Projects;