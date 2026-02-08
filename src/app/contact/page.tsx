'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send an API request
        setSubmitted(true);
    };

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>We&apos;re Here to Help.</h1>
                    <p className={styles.subtitle}>Have questions about a property or the booking process? Our team of experts is ready to assist you.</p>
                </div>
            </section>

            <section className={styles.main}>
                <div className={`container ${styles.grid}`}>
                    <div className={styles.contactInfo}>
                        <div className={styles.infoCard}>
                            <h2 className={styles.sectionTitle}>Global Headquarters</h2>
                            <p>123 Real Estate Tower, <br />Business District, New Delhi, India</p>
                            <p><strong>Phone:</strong> +91 123 456 7890</p>
                            <p><strong>Email:</strong> support@nestor.com</p>
                        </div>

                        <div className={styles.infoCard}>
                            <h2 className={styles.sectionTitle}>Sales Office</h2>
                            <p>Oceania Prime Site Office, <br />Sector 45, Greater Noida, UP</p>
                            <p><strong>Phone:</strong> +91 098 765 4321</p>
                            <p><strong>Hours:</strong> Mon - Sat, 9 AM - 6 PM</p>
                        </div>
                    </div>

                    <div className={styles.contactForm}>
                        {submitted ? (
                            <div className={styles.successMessage}>
                                <h2>Message Received!</h2>
                                <p>Thank you for reaching out. One of our representatives will contact you shortly.</p>
                                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <h2 className={styles.formTitle}>Send us a Message</h2>
                                <div className={styles.formGroup}>
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Subject</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option>General Inquiry</option>
                                        <option>Property Booking</option>
                                        <option>Technical Support</option>
                                        <option>Feedback</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <section className={styles.map}>
                <div className={styles.mapPlaceholder}>
                    <p>Interactive Map Integration <br /><span>Coming Soon</span></p>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
