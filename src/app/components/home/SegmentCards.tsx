import Link from 'next/link';
import styles from './SegmentCards.module.css';

const segments = [
    {
        title: 'Freehold Plots',
        description: 'Invest in prime land with clear titles and structured slot numbering.',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
        link: '/segments/plots',
        cta: 'Explore Plots'
    },
    {
        title: 'Ready-to-Move Houses',
        description: 'Find your perfect home in our meticulously planned residential rows.',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
        link: '/segments/houses',
        cta: 'Explore Houses'
    },
    {
        title: 'Apartments & Villas',
        description: 'Experience premium living with modern amenities and high-rise views.',
        image: 'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=800',
        link: '/segments/luxury',
        cta: 'Explore Luxury'
    }
];

const SegmentCards = () => {
    return (
        <section className="section">
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.sectionTitle}>Our Property Segments</h2>
                    <p className={styles.sectionSubtitle}>Choose the property type that fits your lifestyle and investment goals.</p>
                </div>

                <div className={styles.grid}>
                    {segments.map((segment, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={segment.image} alt={segment.title} className={styles.image} />
                                <div className={styles.cardOverlay}>
                                    <Link href={segment.link} className="btn btn-secondary">
                                        {segment.cta}
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.cardTitle}>{segment.title}</h3>
                                <p className={styles.cardDescription}>{segment.description}</p>
                                <Link href={segment.link} className={styles.textLink}>
                                    View Details &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SegmentCards;
