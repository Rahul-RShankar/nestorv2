import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerGrid}`}>
                <div className={styles.brand}>
                    <h2 className={styles.logo}>NESTOR</h2>
                    <p className={styles.tagline}>
                        Redefining real estate booking through transparency and technology.
                    </p>
                </div>

                <div className={styles.linksGroup}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/faqs">FAQs</Link></li>
                        <li><Link href="/support">Support</Link></li>
                    </ul>
                </div>

                <div className={styles.linksGroup}>
                    <h3>Segments</h3>
                    <ul>
                        <li><Link href="/segments/plots">Freehold Plots</Link></li>
                        <li><Link href="/segments/houses">Ready-to-Move Houses</Link></li>
                        <li><Link href="/segments/luxury">Apartments & Villas</Link></li>
                    </ul>
                </div>

                <div className={styles.linksGroup}>
                    <h3>Legal</h3>
                    <ul>
                        <li><Link href="/terms">Terms of Service</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/booking-policy">Booking Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Nestor Real Estate Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
