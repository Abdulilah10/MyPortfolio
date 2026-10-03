import profilePhoto from '../assets/profile.jpg'

function About() {
  return (
    <main className="page about-page">
      <h1>About Me</h1>

      <div className="about-content">
        <img
          src={profilePhoto}
          alt="Abdulilah Ahmedin"
          className="profile-photo"
        />

        <div className="about-text">
          <h2>Abdulilah Ahmedin</h2>

          <p>
            <p>
                 I am currently a Software Engineering student at Centennial College.
                 I enjoy building software, learning new technologies, and improving my
                 programming skills through hands-on projects. My experience in customer
                 service has also helped me develop strong communication, teamwork, and
                 problem-solving skills. I am always looking for opportunities to learn,
                 grow, and apply my skills to real-world projects.
          </p>
            </p>

          <a
           href="/Abdulilah_Ahmedin_Resume.pdf"
           target="_blank"
           rel="noopener noreferrer"
           className="button"
        >
           View My Resume
          </a>
        </div>
      </div>
    </main>
  )
}

export default About