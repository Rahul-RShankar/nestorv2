'use client';

import { useState } from 'react';
import PropertyCard from '@/components/ui/PropertyCard';
import styles from './Houses.module.css';

// Mock Data for Houses
const MOCK_HOUSES = [
    { id: 'h1', plotNo: 'A12', status: 'AVAILABLE', price: 8500000, area: 1800, type: '3BHK', segment: 'HOUSE', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
    { id: 'h2', plotNo: 'A13', status: 'BOOKED', price: 9200000, area: 2200, type: '4BHK', segment: 'HOUSE', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
    { id: 'h3', plotNo: 'B05', status: 'AVAILABLE', price: 7800000, area: 1600, type: '2BHK', segment: 'HOUSE', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
    { id: 'h4', plotNo: 'B06', status: 'AVAILABLE', price: 10500000, area: 2600, type: '4BHK+', segment: 'HOUSE', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
    { id: 'h5', plotNo: 'C01', status: 'AVAILABLE', price: 8200000, area: 1900, type: '3BHK', segment: 'HOUSE', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
] as const;

const HousesPage = () => {
    const [filter, setFilter] = useState({
        price: 12000000,
        type: 'All'
    });

    const filteredHouses = MOCK_HOUSES.filter(house =>
        house.price <= filter.price &&
        (filter.type === 'All' || house.type.includes(filter.type))
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Ready-to-Move Houses</h1>
                    <p className={styles.subtitle}>Modern residential homes in planned rows, designed for comfort and elegance.</p>
                </div>
            </header>

            <section className={styles.main}>
                <div className={`container ${styles.layout}`}>
                    <aside className={styles.sidebar}>
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterTitle}>Filters</h3>

                            <div className={styles.filterItem}>
                                <label>Max Price: ₹{filter.price.toLocaleString()}</label>
                                <input
                                    type="range"
                                    min="5000000"
                                    max="12000000"
                                    step="200000"
                                    value={filter.price}
                                    onChange={(e) => setFilter({ ...filter, price: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className={styles.filterItem}>
                                <label>BHK Type</label>
                                <select
                                    value={filter.type}
                                    onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                                    className={styles.select}
                                >
                                    <option value="All">All Types</option>
                                    <option value="2BHK">2 BHK</option>
                                    <option value="3BHK">3 BHK</option>
                                    <option value="4BHK">4 BHK</option>
                                </select>
                            </div>

                            <button
                                className="btn btn-outline"
                                style={{ width: '100%', marginTop: '1rem' }}
                                onClick={() => setFilter({ price: 12000000, type: 'All' })}
                            >
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    <main className={styles.content}>
                        <div className={styles.resultsBar}>
                            <p>{filteredHouses.length} Properties Matching</p>
                        </div>

                        <div className={styles.grid}>
                            {filteredHouses.map(house => (
                                <PropertyCard key={house.id} property={house} />
                            ))}
                        </div>

                        {filteredHouses.length === 0 && (
                            <div className={styles.empty}>
                                <p>No results found matching your criteria.</p>
                            </div>
                        )}
                    </main>
                </div>
            </section>
        </div>
    );
};

export default HousesPage;
