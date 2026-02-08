import styles from './About.module.css';

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>Redefining Real Estate <br />with Precision.</h1>
                    <p className={styles.subtitle}>Nestor is a state-of-the-art property platform designed to simplify the booking-to-allotment lifecycle for modern home buyers.</p>
                </div>
            </section>

            <section className={styles.content}>
                <div className="container">
                    <div className={styles.grid}>
                        <div className={styles.textBlock}>
                            <h2 className={styles.sectionTitle}>Our Vision</h2>
                            <p>At Nestor, we believe that buying a home shouldn't be a complex web of paperwork and uncertainty. Our platform brings transparency, speed, and precision to the real estate market by digitizing the entire property acquisition process.</p>
                        </div>

                        <div className={styles.textBlock}>
                            <h2 className={styles.sectionTitle}>Phased Excellence</h2>
                            <p>We operate on a unique 3-phase model that ensures our clients are informed at every step:</p>
                            <ul className={styles.list}>
                                <li><strong>Phase 1: Booking</strong> – Secure your preferred unit with a token amount.</li>
                                <li><strong>Phase 2: Development</strong> – Track the progress of infrastructure and construction.</li>
                                <li><strong>Phase 3: Allotment</strong> – Finalize payments and receive legal possession.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.stats}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <h3>500+</h3>
                            <p>Premium Plots</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>120+</h3>
                            <p>Ready Houses</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>100%</h3>
                            <p>Digital Transparency</p>
                        </div>
                        <div className={styles.statItem}>
                            <h3>24/7</h3>
                            <p>Smart Support</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
