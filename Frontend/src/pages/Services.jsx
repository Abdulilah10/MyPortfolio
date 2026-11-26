import { useState, useEffect } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000/api/services";

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message);
        }

        setServices(result.data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <main>
      <section className="services">
        <h1>My Services</h1>

        {loading && <p>Loading services...</p>}

        {error && <p>{error}</p>}

        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}

        {!loading && !error && services.length === 0 && (
          <p>No services available.</p>
        )}

      </section>
    </main>
  );
}

export default Services;