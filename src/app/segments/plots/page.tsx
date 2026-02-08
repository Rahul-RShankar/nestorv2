'use client';

import { useState } from 'react';
import PropertyCard from '@/components/ui/PropertyCard';
import styles from './Plots.module.css';

// Mock Data for Plots
const MOCK_PLOTS = [
    { id: 'p1', slotNo: '107', status: 'AVAILABLE', price: 4500000, area: 1200, facing: 'East', segment: 'PLOT', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800' },
    { id: 'p2', slotNo: '108', status: 'BOOKED', price: 4800000, area: 1500, facing: 'West', segment: 'PLOT', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800' },
    { id: 'p3', slotNo: '109', status: 'AVAILABLE', price: 4200000, area: 1000, facing: 'North', segment: 'PLOT', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800' },
    { id: 'p4', slotNo: '210', status: 'AVAILABLE', price: 5500000, area: 1800, facing: 'South', segment: 'PLOT', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800' },
    { id: 'p5', slotNo: '211', status: 'AVAILABLE', price: 5100000, area: 1400, facing: 'East', segment: 'PLOT', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800' },
    { id: 'p6', slotNo: '212', status: 'ALLOTTED', price: 4900000, area: 1300, facing: 'West', segment: 'PLOT', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800' },
] as const;

const PlotsPage = () => {
    const [filter, setFilter] = useState({
        price: 6000000,
        area: 0,
        facing: 'All'
    });

    const filteredPlots = MOCK_PLOTS.filter(plot =>
        plot.price <= filter.price &&
        plot.area >= filter.area &&
        (filter.facing === 'All' || plot.facing === filter.facing)
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Freehold Plots</h1>
                    <p className={styles.subtitle}>Premium residential plots with modern infrastructure in Oceania Prime.</p>
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
                                    min="3000000"
                                    max="6000000"
                                    step="100000"
                                    value={filter.price}
                                    onChange={(e) => setFilter({ ...filter, price: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className={styles.filterItem}>
                                <label>Min Area (sq.ft): {filter.area}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="2000"
                                    step="100"
                                    value={filter.area}
                                    onChange={(e) => setFilter({ ...filter, area: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className={styles.filterItem}>
                                <label>Facing</label>
                                <select
                                    value={filter.facing}
                                    onChange={(e) => setFilter({ ...filter, facing: e.target.value })}
                                    className={styles.select}
                                >
                                    <option value="All">All Facings</option>
                                    <option value="East">East</option>
                                    <option value="West">West</option>
                                    <option value="North">North</option>
                                    <option value="South">South</option>
                                </select>
                            </div>

                            <button
                                className="btn btn-outline"
                                style={{ width: '100%', marginTop: '1rem' }}
                                onClick={() => setFilter({ price: 6000000, area: 0, facing: 'All' })}
                            >
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    <main className={styles.content}>
                        <div className={styles.resultsBar}>
                            <p>{filteredPlots.length} Properties Matching</p>
                        </div>

                        <div className={styles.grid}>
                            {filteredPlots.map(plot => (
                                <PropertyCard key={plot.id} property={plot} />
                            ))}
                        </div>

                        {filteredPlots.length === 0 && (
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

export default PlotsPage;
