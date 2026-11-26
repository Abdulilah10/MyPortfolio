import { useState, useEffect } from "react";

function References() {
  const [references, setReferences] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000/api/references";

  useEffect(() => {
    async function loadReferences() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message);
        }

        setReferences(result.data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadReferences();
  }, []);

  return (
    <main className="page">
      <section className="references">
        <h1>References</h1>

        <p className="section-intro">
          Professional references who can speak about my work experience and skills.
        </p>

        {loading && <p>Loading references...</p>}

        {error && <p>{error}</p>}

        <div className="references-grid">

          {references.map((reference) => (
            <div className="reference-card" key={reference.id}>
              <h2>{reference.name}</h2>

              <div className="reference-info">
                <p>
                  <strong>Company</strong>
                  <span>{reference.company}</span>
                </p>

                <p>
                  <strong>Position</strong>
                  <span>{reference.position}</span>
                </p>

                <p>
                  <strong>Testimonial</strong>
                  <span>“{reference.testimonial}”</span>
                </p>
              </div>
            </div>
          ))}

        </div>

        {!loading && !error && references.length === 0 && (
          <p>No references available.</p>
        )}

      </section>
    </main>
  );
}

export default References;