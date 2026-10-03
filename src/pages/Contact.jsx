import { useNavigate } from 'react-router-dom'

function Contact() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/')
  }
  return (
    <main className="page contact-page">
      <h1>Contact Me</h1>
      <p className="page-subtitle">
        Feel free to contact me using the information or form below.
      </p>

      <div className="contact-container">
        <section className="contact-info">
          <h2>Get in Touch</h2>

          <div className="contact-detail">
            <span>Name</span>
            <p>Abdulilah Ahmedin</p>
          </div>

          <div className="contact-detail">
            <span>Phone</span>
            <p>647-406-2090</p>
          </div>

          <div className="contact-detail">
            <span>Email</span>
            <p>abodyidris11@gmail.com</p>
          </div>

          <div className="contact-detail">
            <span>Location</span>
            <p>Toronto, Ontario</p>
          </div>
        </section>

        <section className="contact-form-section">
          <h2>Send Me a Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Contact Number</label>
                <input type="tel" id="phone" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5"></textarea>
            </div>

            <button type="submit" className="send-button">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Contact