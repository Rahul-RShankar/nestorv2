'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './PropertyDetail.module.css';

// Combined Mock Data for retrieval
const ALL_PROPERTIES = [
    { id: 'p1', slotNo: '107', status: 'AVAILABLE', price: 4500000, area: 1200, facing: 'East', segment: 'PLOT', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800' },
    { id: 'h1', plotNo: 'A12', status: 'AVAILABLE', price: 8500000, area: 1800, type: '3BHK', segment: 'HOUSE', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
    { id: 'a1', floorNo: '5', status: 'AVAILABLE', price: 12500000, area: 1600, type: '3BHK', segment: 'APARTMENT', image: 'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=800' },
    { id: 'v1', plotNo: 'V01', status: 'AVAILABLE', price: 25000000, area: 3500, type: 'Luxury Villa', segment: 'VILLA', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800' },
];

const PropertyDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const property = ALL_PROPERTIES.find(p => p.id === id);

    if (!property) {
        return (
            <div className={styles.notFound}>
                <h1>Property Not Found</h1>
                <p>The property you are looking for does not exist or has been removed.</p>
                <Link href="/" className="btn btn-primary">Go Home</Link>
            </div>
        );
    }

    const isAvailable = property.status === 'AVAILABLE';

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <img src={property.image} alt="Property Hero" className={styles.heroImage} />
                <div className={styles.heroOverlay}>
                    <div className="container">
                        <span className={`${styles.badge} ${styles[property.status.toLowerCase()]}`}>{property.status}</span>
                        <h1 className={styles.title}>{property.segment} - {property.slotNo || property.plotNo || property.id}</h1>
                        <p className={styles.location}>Oceania Prime, New Delhi Area</p>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.layout}`}>
                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Description</h2>
                        <p className={styles.description}>
                            Experience luxury and precision with this premium {property.segment.toLowerCase()}.
                            Located in the heart of the Oceania Prime project, this {property.segment.toLowerCase()} offers
                            unparalleled views and modern infrastructure. Perfect for both investment and residential purposes.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Specifications</h2>
                        <div className={styles.specsGrid}>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Area</span>
                                <span className={styles.specValue}>{property.area} Sq. Ft.</span>
                            </div>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Facing</span>
                                <span className={styles.specValue}>{property.facing || 'N/A'}</span>
                            </div>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Status</span>
                                <span className={styles.specValue}>{property.status}</span>
                            </div>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Type</span>
                                <span className={styles.specValue}>{(property as any).type || 'Premium Plot'}</span>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Amenities</h2>
                        <ul className={styles.amenities}>
                            <li>Gated Community</li>
                            <li>24/7 Security</li>
                            <li>Underground Utilities</li>
                            <li>Landscape Parks</li>
                            <li>Club House Access</li>
                            <li>Paved Roads</li>
                        </ul>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.bookingCard}>
                        <div className={styles.priceSection}>
                            <span className={styles.priceLabel}>Price</span>
                            <h2 className={styles.priceValue}>₹{property.price.toLocaleString()}</h2>
                        </div>

                        <div className={styles.infoRow}>
                            <span>Phase</span>
                            <span className={styles.bold}>Booking (Phase 1)</span>
                        </div>

                        <div className={styles.infoRow}>
                            <span>Token Amount</span>
                            <span className={styles.bold}>₹{(property.price * 0.1).toLocaleString()}</span>
                        </div>

                        <button
                            className={`btn ${isAvailable ? 'btn-primary' : 'btn-disabled'}`}
                            style={{ width: '100%', padding: '1.25rem', marginTop: '1.5rem', fontSize: '1.1rem' }}
                            onClick={() => isAvailable && router.push(`/booking/${property.id}`)}
                            disabled={!isAvailable}
                        >
                            {isAvailable ? 'Proceed to Booking' : 'Currently Unavailable'}
                        </button>

                        <p className={styles.scarcityText}>
                            {isAvailable ? 'Limited slots available in this row. Secure yours now.' : 'This unit has already been booked by another user.'}
                        </p>
                    </div>

                    <div className={styles.contactSupport}>
                        <p>Need help? Contact our sales team</p>
                        <a href="tel:+911234567890" className={styles.phoneLink}>+91 123 456 7890</a>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default PropertyDetailPage;
