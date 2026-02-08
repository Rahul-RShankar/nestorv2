import Hero from "@/components/home/Hero";
import PhaseStatusBanner from "@/components/ui/PhaseStatusBanner";
import SegmentCards from "@/components/home/SegmentCards";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <PhaseStatusBanner currentPhase={1} />
      <SegmentCards />

      {/* Featured Project Details (Optional/Future) */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                Nestor Flagship: <span style={{ color: 'var(--secondary)' }}>Oceania Prime</span>
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                Located in the heart of the southern corridor, Oceania Prime offers a unique blend of heritage architecture and modern urban planning. Phase 1 bookings for Slot Nos. 100-250 are now open.
              </p>
              <ul style={{ listStyle: 'none', marginBottom: '2.5rem' }}>
                {['Direct Road Access', 'Underground Utilities', 'Smart Lighting', '24/7 Security'].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                    <span style={{ color: 'var(--success)' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary">Download Brochure</button>
            </div>
            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000"
                alt="Oceania Prime"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
