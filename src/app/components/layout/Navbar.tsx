'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    NESTOR
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/about">About</Link>
                    <div className={styles.dropdown}>
                        <span className={styles.dropdownLabel}>Segments</span>
                        <div className={styles.dropdownContent}>
                            <Link href="/segments/plots">Freehold Plots</Link>
                            <Link href="/segments/houses">Ready-to-Move Houses</Link>
                            <Link href="/segments/luxury">Apartments & Villas</Link>
                        </div>
                    </div>
                    <Link href="/contact">Contact</Link>
                </div>
                <div className={styles.authLinks}>
                    {session ? (
                        <>
                            <Link href="/dashboard/customer" className="btn btn-outline" style={{ border: 'none' }}>
                                My Dashboard
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="btn btn-primary"
                                style={{ padding: '0.6rem 1.2rem' }}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="btn btn-outline">Login</Link>
                            <Link href="/auth/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
