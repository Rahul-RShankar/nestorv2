'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [currentPhase, setCurrentPhase] = useState('Booking');

    if (status === 'loading') return <div className={styles.loader}>Loading...</div>;

    // Role check (mocked for now, should check session.user.role)
    // if (session?.user?.role === 'CUSTOMER') {
    //   router.push('/dashboard/customer');
    //   return null;
    // }

    const mockInventory = [
        { segment: 'Plots', total: 500, available: 340, booked: 120, allotted: 40 },
        { segment: 'Houses', total: 120, available: 45, booked: 60, allotted: 15 },
        { segment: 'Luxury', total: 50, available: 12, booked: 28, allotted: 10 },
    ];

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.adminBrand}>
                    <h2>Nestor Admin</h2>
                </div>
                <nav className={styles.nav}>
                    <button className={`${styles.navItem} ${styles.active}`}>Overview</button>
                    <button className={styles.navItem}>Inventory Management</button>
                    <button className={styles.navItem}>Booking Approvals</button>
                    <button className={styles.navItem}>Project Phases</button>
                    <button className={styles.navItem}>User Registry</button>
                    <button className={styles.navItem}>System Logs</button>
                </nav>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.headerRow}>
                        <h1>Admin Console</h1>
                        <div className={styles.phaseControl}>
                            <label>Current Global Phase:</label>
                            <select value={currentPhase} onChange={(e) => setCurrentPhase(e.target.value)}>
                                <option>Booking</option>
                                <option>Development</option>
                                <option>Allotment</option>
                            </select>
                        </div>
                    </div>
                </header>

                <section className={styles.statsSection}>
                    <div className={styles.statCard}>
                        <h3>Total Inventory</h3>
                        <h2>670 Units</h2>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Booked</h3>
                        <h2>208 Units</h2>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Revenue Collected (Mock)</h3>
                        <h2>₹45.6 Cr</h2>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Active Sales Reps</h3>
                        <h2>12</h2>
                    </div>
                </section>

                <section className={styles.inventorySection}>
                    <h2>Inventory Breakdown</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Segment</th>
                                <th>Total Units</th>
                                <th>Available</th>
                                <th>Booked</th>
                                <th>Allotted</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockInventory.map((item, idx) => (
                                <tr key={idx}>
                                    <td className={styles.bolder}>{item.segment}</td>
                                    <td>{item.total}</td>
                                    <td className={styles.availableTxt}>{item.available}</td>
                                    <td className={styles.bookedTxt}>{item.booked}</td>
                                    <td className={styles.allottedTxt}>{item.allotted}</td>
                                    <td><span className={styles.statusBadge}>In Phase 1</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className={styles.recentActivity}>
                    <div className={styles.sectionHeader}>
                        <h2>Recent Bookings</h2>
                        <button className="btn btn-primary btn-sm">Export Data</button>
                    </div>
                    <div className={styles.activityList}>
                        <div className={styles.activityItem}>
                            <div className={styles.activityDot}></div>
                            <p><strong>Elon Musk</strong> booked <strong>Plot 107</strong> in Oceania Prime</p>
                            <span>2 mins ago</span>
                        </div>
                        <div className={styles.activityItem}>
                            <div className={styles.activityDot}></div>
                            <p><strong>Steve Jobs</strong> completed Phase 1 payment for <strong>House A12</strong></p>
                            <span>15 mins ago</span>
                        </div>
                        <div className={styles.activityItem}>
                            <div className={styles.activityDot}></div>
                            <p><strong>Admin</strong> transitioned Project <strong>Oceania Prime</strong> to Phase 2</p>
                            <span>1 hour ago</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
