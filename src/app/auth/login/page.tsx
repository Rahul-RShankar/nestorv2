'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../Auth.module.css';

const LoginPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchParams.get('registered')) {
            setSuccess('Registration successful! Please login to continue.');
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password
        });

        if (result?.error) {
            setError('Invalid email or password');
            setLoading(false);
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <h1 className={styles.authTitle}>Welcome Back</h1>
                <p className={styles.authSubtitle}>Enter your credentials to access your Nestor dashboard.</p>

                {error && <div className={styles.error}>{error}</div>}
                {success && <div style={{ background: '#ecfdf5', color: '#059669', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid #d1fae5' }}>{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className={styles.input}
                            placeholder="elon@nestor.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label className={styles.label} style={{ marginBottom: 0 }}>Password</label>
                            <Link href="/auth/forgot-password" className={styles.forgotLink}>Forgot Password?</Link>
                        </div>
                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                <div className={styles.footer}>
                    Don&apos;t have an account?
                    <Link href="/auth/register" className={styles.footerLink}>Register now</Link>
                </div>
            </div >
        </div >
    );
};

export default LoginPage;
