'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './CustomerDashboard.module.css';

const CustomerDashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') return <div className={styles.loader}>Loading...</div>;
    if (status === 'unauthenticated') {
        router.push('/auth/login');
        return null;
    }

    const mockBookings = [
        { id: 'b1', property: 'Plot 107', area: '1200 Sq. Ft.', phase: 1, status: 'Confirmed', date: 'Oct 12, 2025' },
        { id: 'b2', property: 'House A12', area: '1800 Sq. Ft.', phase: 2, status: 'In Progress', date: 'Sep 05, 2025' },
    ];

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.userProfile}>
                    <div className={styles.avatar}>{session?.user?.name?.[0] || 'U'}</div>
                    <div className={styles.userInfo}>
                        <h3>{session?.user?.name}</h3>
                        <p>Premium Member</p>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <button className={`${styles.navItem} ${styles.active}`}>My Bookings</button>
                    <button className={styles.navItem}>Billing & Receipts</button>
                    <button className={styles.navItem}>Documents</button>
                    <button className={styles.navItem}>Help & Support</button>
                </nav>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}. Here is what&apos;s happening with your properties.</p>
                </header>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span>Active Bookings</span>
                        <h2>2</h2>
                    </div>
                    <div className={styles.statCard}>
                        <span>Pending Payments</span>
                        <h2>₹0</h2>
                    </div>
                    <div className={styles.statCard}>
                        <span>Project Phase</span>
                        <h2 className={styles.phaseTxt}>Development</h2>
                    </div>
                </div>

                <section className={styles.bookingsSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Recent Bookings</h2>
                        <button className="btn btn-outline btn-sm">View All</button>
                    </div>

                    <div className={styles.bookingList}>
                        {mockBookings.map(booking => (
                            <div key={booking.id} className={styles.bookingCard}>
                                <div className={styles.bookingInfo}>
                                    <h3>{booking.property}</h3>
                                    <p>{booking.area} | Booked on {booking.date}</p>
                                </div>

                                <div className={styles.phaseIndicator}>
                                    <div className={styles.phaseLabels}>
                                        <span className={booking.phase >= 1 ? styles.activePhase : ''}>Booking</span>
                                        <span className={booking.phase >= 2 ? styles.activePhase : ''}>Development</span>
                                        <span className={booking.phase >= 3 ? styles.activePhase : ''}>Allotment</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div className={styles.progressFill} style={{ width: `${(booking.phase / 3) * 100}%` }}></div>
                                    </div>
                                </div>

                                <div className={styles.bookingActions}>
                                    <button className="btn btn-outline btn-sm">View Details</button>
                                    <button className="btn btn-primary btn-sm">Receipt</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.docsSection}>
                    <h2>Quick Downloads</h2>
                    <div className={styles.docsGrid}>
                        <div className={styles.docItem}>
                            <div className={styles.docIcon}>📄</div>
                            <div className={styles.docContent}>
                                <h4>Booking Agreement</h4>
                                <p>PDF | 1.2 MB</p>
                            </div>
                            <button className={styles.downloadBtn}>↓</button>
                        </div>
                        <div className={styles.docItem}>
                            <div className={styles.docIcon}>💰</div>
                            <div className={styles.docContent}>
                                <h4>Token Receipt - #4451</h4>
                                <p>PDF | 450 KB</p>
                            </div>
                            <button className={styles.downloadBtn}>↓</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CustomerDashboard;
