export default function ContactMap() {
  const q = encodeURIComponent("KM 5, Itokin Road, Itamope, Ikorodu, Lagos, Nigeria");
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="contact-map reveal">
          <iframe
            title="TG Agri Farms - Ikorodu location"
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
