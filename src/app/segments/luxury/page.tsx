'use client';

import { useState } from 'react';
import PropertyCard from '@/components/ui/PropertyCard';
import styles from './Luxury.module.css';

// Mock Data
const MOCK_DATA = [
    // Apartments
    { id: 'a1', floorNo: '5', status: 'AVAILABLE', price: 12500000, area: 1600, type: '3BHK', segment: 'APARTMENT', image: 'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=800' },
    { id: 'a2', floorNo: '12', status: 'AVAILABLE', price: 15000000, area: 2000, type: '4BHK', segment: 'APARTMENT', image: 'https://images.unsplash.com/photo-1545324418-f1d3ac1ef739?auto=format&fit=crop&q=80&w=800' },
    // Villas
    { id: 'v1', plotNo: 'V01', status: 'AVAILABLE', price: 25000000, area: 3500, type: 'Luxury Villa', segment: 'VILLA', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800' },
    // Commercial
    { id: 'c1', floorNo: 'G', status: 'AVAILABLE', price: 50000000, area: 5000, type: 'Retail Space', segment: 'COMMERCIAL', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
] as const;

const LuxuryPage = () => {
    const [activeTab, setActiveTab] = useState<'ALL' | 'APARTMENT' | 'VILLA' | 'COMMERCIAL'>('ALL');
    const [maxPrice, setMaxPrice] = useState(60000000);

    const filteredData = MOCK_DATA.filter(item =>
        (activeTab === 'ALL' || item.segment === activeTab) &&
        item.price <= maxPrice
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Commercial & Luxury</h1>
                    <p className={styles.subtitle}>Curated selection of premium apartments, independent villas, and high-yield commercial spaces.</p>
                </div>
            </header>

            <div className={styles.tabBar}>
                <div className="container">
                    <div className={styles.tabs}>
                        <button className={`${styles.tab} ${activeTab === 'ALL' ? styles.activeTab : ''}`} onClick={() => setActiveTab('ALL')}>All Properties</button>
                        <button className={`${styles.tab} ${activeTab === 'COMMERCIAL' ? styles.activeTab : ''}`} onClick={() => setActiveTab('COMMERCIAL')}>Commercial</button>
                        <button className={`${styles.tab} ${activeTab === 'APARTMENT' ? styles.activeTab : ''}`} onClick={() => setActiveTab('APARTMENT')}>Apartments</button>
                        <button className={`${styles.tab} ${activeTab === 'VILLA' ? styles.activeTab : ''}`} onClick={() => setActiveTab('VILLA')}>Villas</button>
                    </div>
                </div>
            </div>

            <section className={styles.main}>
                <div className={`container ${styles.layout}`}>
                    <aside className={styles.sidebar}>
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterTitle}>Filters</h3>

                            <div className={styles.filterItem}>
                                <label>Max Price: ₹{(maxPrice / 10000000).toFixed(1)} Cr</label>
                                <input
                                    type="range"
                                    min="10000000"
                                    max="60000000"
                                    step="1000000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                />
                            </div>

                            <button
                                className="btn btn-outline"
                                style={{ width: '100%', marginTop: '1rem' }}
                                onClick={() => { setMaxPrice(60000000); setActiveTab('ALL'); }}
                            >
                                Reset
                            </button>
                        </div>
                    </aside>

                    <main className={styles.content}>
                        <div className={styles.grid}>
                            {filteredData.map(item => (
                                <PropertyCard key={item.id} property={item} />
                            ))}
                        </div>

                        {filteredData.length === 0 && (
                            <div className={styles.empty}>
                                <p>No results matching your current filters.</p>
                            </div>
                        )}
                    </main>
                </div>
            </section>
        </div>
    );
};

export default LuxuryPage;
