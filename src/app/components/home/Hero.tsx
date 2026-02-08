import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={`container ${styles.heroContent}`}>
                <div className={styles.badge}>Phase 1 Booking Now Live</div>
                <h1 className={styles.title}>
                    Your Future, <span className={styles.highlight}>Precisely</span> Located.
                </h1>
                <p className={styles.subtitle}>
                    Nestor provides a structured real-estate booking experience. Secure your plot, floor, or villa with a transparent booking-to-allotment process.
                </p>
                <div className={styles.actions}>
                    <Link href="/segments/plots" className="btn btn-primary btn-lg">View Properties</Link>
                    <Link href="/auth/register" className="btn btn-outline btn-lg">Start Account</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
