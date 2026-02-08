import Link from 'next/link';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
    property: {
        id: string;
        slotNo?: string;
        plotNo?: string;
        floorNo?: string;
        rowNo?: string;
        status: 'AVAILABLE' | 'BOOKED' | 'ALLOTTED';
        price: number;
        area: number;
        facing?: string;
        segment: string;
        image: string;
    };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
    const isAvailable = property.status === 'AVAILABLE';

    const getIdentifier = () => {
        if (property.slotNo) return `Slot ${property.slotNo}`;
        if (property.plotNo) return `Plot ${property.plotNo}`;
        return `ID: ${property.id.substring(0, 6)}`;
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={property.image} alt={getIdentifier()} className={styles.image} />
                <span className={`${styles.statusBadge} ${styles[property.status.toLowerCase()]}`}>
                    {property.status}
                </span>
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.identifier}>{getIdentifier()}</h3>
                    <p className={styles.price}>₹{property.price.toLocaleString()}</p>
                </div>

                <div className={styles.specs}>
                    <div className={styles.specItem}>
                        <span className={styles.specLabel}>Area</span>
                        <span className={styles.specValue}>{property.area} sq.ft</span>
                    </div>
                    {property.facing && (
                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>Facing</span>
                            <span className={styles.specValue}>{property.facing}</span>
                        </div>
                    )}
                </div>

                <div className={styles.actions}>
                    <Link href={`/properties/${property.id}`} className="btn btn-outline" style={{ flex: 1 }}>
                        Details
                    </Link>
                    <Link
                        href={isAvailable ? `/booking/${property.id}` : '#'}
                        className={`btn ${isAvailable ? 'btn-primary' : 'btn-disabled'}`}
                        style={{ flex: 1.5 }}
                    >
                        {isAvailable ? 'Book Now' : 'Booked'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
