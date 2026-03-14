import { useState } from "react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Aquí iría la llamada a tu API
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      
      // if (response.ok) {
      //   setSubmitStatus("success");
      //   setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      // } else {
      //   setSubmitStatus("error");
      // }

      // Por ahora, simulamos un envío exitoso
      setTimeout(() => {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contacto-container">
      <style>{`
        .contacto-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .contacto-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .contacto-header h1 {
          font-size: clamp(2rem, 5vw, 2.5rem);
          color: #1f3c88;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .contacto-header p {
          font-size: clamp(1rem, 3vw, 1.1rem);
          color: #666;
        }

        .contacto-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: clamp(2rem, 4vw, 3rem);
        }

        .contacto-form {
          background: white;
          padding: clamp(1.5rem, 4vw, 2rem);
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .contacto-form h2 {
          font-size: clamp(1.3rem, 3vw, 1.5rem);
          color: #1f3c88;
          margin-bottom: 0.5rem;
        }

        .contacto-form p {
          color: #666;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-row.single {
          grid-template-columns: 1fr;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-family: inherit;
          font-size: 0.95rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #1f3c88;
          box-shadow: 0 0 0 3px rgba(31, 60, 136, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          background-color: #1f3c88;
          color: white;
          padding: 0.85rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          min-height: 44px;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #152a5f;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(31, 60, 136, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-status {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 6px;
          text-align: center;
          font-weight: 500;
        }

        .form-status.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .form-status.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .contacto-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-box {
          background: white;
          padding: clamp(1.5rem, 4vw, 2rem);
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .info-icon {
          font-size: 1.75rem;
          color: #1f3c88;
          min-width: 50px;
          text-align: center;
        }

        .info-content h3 {
          font-size: 1.1rem;
          color: #1f3c88;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .info-content p {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
        }

        .info-content a {
          color: #1f3c88;
          text-decoration: none;
          font-weight: 500;
        }

        .info-content a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .contacto-content {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contacto-info {
            order: -1;
          }
        }
      `}</style>

      <div className="contacto-header">
        <h1>Contactanos</h1>
        <p>Deporte · Comunidad · Pasión</p>
      </div>

      <div className="contacto-content">
        <div className="contacto-form">
          <h2>¿Tienes consultas?</h2>
          <p>Completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+54 9 351 123-4567"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Asunto *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="¿De qué se trata?"
                />
              </div>
            </div>

            <div className="form-group form-row single">
              <label htmlFor="message">Mensaje *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Cuéntanos más detalles..."
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>

            {submitStatus === "success" && (
              <div className="form-status success">
                ✓ Mensaje enviado correctamente. Te contactaremos pronto.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="form-status error">
                ✗ Error al enviar el mensaje. Por favor, intenta nuevamente.
              </div>
            )}
          </form>
        </div>

        <div className="contacto-info">
          <div className="info-box">
            <div className="info-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="info-content">
              <h3>Ubicación</h3>
              <p>Valle de Punilla, Córdoba, Argentina</p>
            </div>
          </div>

          <div className="info-box">
            <div className="info-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="info-content">
              <h3>Horarios</h3>
              <p>Lun a Vie: 09:30 a 12:30 y 16:30 a 21:30<br />
              <small>(salvo días de partido)</small></p>
            </div>
          </div>

          <div className="info-box">
            <div className="info-icon">
              <i className="fas fa-address-book"></i>
            </div>
            <div className="info-content">
              <h3>Contacto Directo</h3>
              <p>
                <a href="tel:+5493512736990">+54 9 351 273 6990</a><br />
                <a href="mailto:handballpunilla@gmail.com">handballpunilla@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="info-box">
            <div className="info-icon">
              <i className="fas fa-share-alt"></i>
            </div>
            <div className="info-content">
              <h3>Síguenos</h3>
              <p>
                <a href="https://www.facebook.com/liga.punilla" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a><br />
                <a href="https://www.instagram.com/ligapunillahandball/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a><br />
                <a href="https://w.app/jm7vln" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
