'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from './Booking.module.css';

// Combined Mock Data
const ALL_PROPERTIES = [
    { id: 'p1', slotNo: '107', status: 'AVAILABLE', price: 4500000, area: 1200, segment: 'PLOT', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800' },
    { id: 'h1', plotNo: 'A12', status: 'AVAILABLE', price: 8500000, area: 1800, segment: 'HOUSE', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
];

const BookingPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, status: authStatus } = useSession();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [property, setProperty] = useState<any>(null);

    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        idType: 'Aadhar',
        idNumber: '',
        agreed: false
    });

    useEffect(() => {
        if (authStatus === 'unauthenticated') {
            router.push(`/auth/login?callbackUrl=/booking/${id}`);
        }

        const found = ALL_PROPERTIES.find(p => p.id === id);
        if (found) {
            setProperty(found);
        } else {
            // Fallback if not in mock data
            setProperty({ id, slotNo: 'Custom', price: 5000000, segment: 'PLOT' });
        }
    }, [id, authStatus, router]);

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleSubmitBooking = async () => {
        setLoading(true);
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStep(5);
        setLoading(false);
    };

    if (authStatus === 'loading') return <div className={styles.loading}>Verifying Session...</div>;
    if (!property) return <div className={styles.loading}>Loading Property Data...</div>;

    return (
        <div className={styles.container}>
            <div className={`container ${styles.wizard}`}>
                <div className={styles.stepper}>
                    {[1, 2, 3, 4, 5].map(num => (
                        <div key={num} className={`${styles.stepIndicator} ${step >= num ? styles.activeStep : ''} ${step > num ? styles.completedStep : ''}`}>
                            {num}
                        </div>
                    ))}
                </div>

                <div className={styles.card}>
                    {step === 1 && (
                        <div className={styles.stepContent}>
                            <h1 className={styles.stepTitle}>Step 1: Review Selection</h1>
                            <div className={styles.summaryContainer}>
                                <img src={property.image} alt="Property" className={styles.summaryImg} />
                                <div className={styles.summaryText}>
                                    <h3>{property.segment} - {property.slotNo || property.plotNo}</h3>
                                    <p><strong>Total Price:</strong> ₹{property.price.toLocaleString()}</p>
                                    <p><strong>Area:</strong> {property.area} Sq. Ft.</p>
                                    <p className={styles.tokenHighlight}><strong>Token Amount (10%):</strong> ₹{(property.price * 0.1).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className={styles.notice}>By proceeding, you initiate the legal booking process for Phase 1. This unit will be temporarily locked for 15 minutes.</p>
                            <div className={styles.actions}>
                                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNext}>Confirm & Continue</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className={styles.stepContent}>
                            <h1 className={styles.stepTitle}>Step 2: Personal Information</h1>
                            <div className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>Full Name</label>
                                    <input type="text" value={session?.user?.name || ''} disabled />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Full Address</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Residential Address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>ID Type</label>
                                        <select
                                            value={formData.idType}
                                            onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                                        >
                                            <option>Aadhar Card</option>
                                            <option>PAN Card</option>
                                            <option>Passport</option>
                                        </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>ID Number</label>
                                        <input
                                            type="text"
                                            placeholder="XXXX-XXXX-XXXX"
                                            value={formData.idNumber}
                                            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <button className="btn btn-outline" onClick={handleBack}>Back</button>
                                <button className="btn btn-primary" onClick={handleNext}>Next Step</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={styles.stepContent}>
                            <h1 className={styles.stepTitle}>Step 3: Declaration</h1>
                            <div className={styles.termsBox}>
                                <h3>Booking Terms & Conditions</h3>
                                <ol>
                                    <li>The token amount is non-refundable if the booking is cancelled after 7 days.</li>
                                    <li>The final allotment is subject to document verification by the legal department.</li>
                                    <li>Monthly development updates will be provided via the customer dashboard.</li>
                                    <li>Pricing is inclusive of basic infrastructure but exclusive of registration charges.</li>
                                </ol>
                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        id="agree"
                                        checked={formData.agreed}
                                        onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                                    />
                                    <label htmlFor="agree">I hereby declare that the information provided is true and I agree to the terms listed above.</label>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <button className="btn btn-outline" onClick={handleBack}>Back</button>
                                <button className="btn btn-primary" disabled={!formData.agreed} onClick={handleNext}>Proceed to Payment</button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className={styles.stepContent}>
                            <h1 className={styles.stepTitle}>Step 4: Token Payment</h1>
                            <div className={styles.paymentBox}>
                                <p>Transfer the token amount to secure your property.</p>
                                <div className={styles.paymentSummary}>
                                    <div className={styles.payRow}>
                                        <span>Property Value</span>
                                        <span>₹{property.price.toLocaleString()}</span>
                                    </div>
                                    <div className={styles.payRow}>
                                        <span>Booking Fee (10%)</span>
                                        <span className={styles.bolder}>₹{(property.price * 0.1).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className={styles.mockPayment}>
                                    <h3>Mock Payment Gateway</h3>
                                    <p>Choose a mock payment method:</p>
                                    <div className={styles.payOptions}>
                                        <div className={styles.payOption}>Net Banking</div>
                                        <div className={styles.payOption}>UPI / QR</div>
                                        <div className={styles.payOption}>Credit/Debit Card</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <button className="btn btn-outline" onClick={handleBack}>Back</button>
                                <button className="btn btn-primary" onClick={handleSubmitBooking} disabled={loading}>
                                    {loading ? 'Processing...' : 'Pay Mock Token Amount'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className={styles.stepContent} style={{ textAlign: 'center' }}>
                            <div className={styles.successIcon}>✓</div>
                            <h1 className={styles.stepTitle}>Booking Confirmed!</h1>
                            <p className={styles.successText}>Congratulations! Your booking for <strong>{property.segment} {property.slotNo || property.plotNo}</strong> has been successfully initiated.</p>
                            <div className={styles.nextStepsCard}>
                                <h3>Next Steps</h3>
                                <ul>
                                    <li>Download your Booking Receipt from the dashboard.</li>
                                    <li>Expect a call from our Relationship Manager within 24 hours.</li>
                                    <li>Phase 2 (Development) tracking will begin once documents are verified.</li>
                                </ul>
                            </div>
                            <div className={styles.actions}>
                                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => router.push('/dashboard')}>Go to Dashboard</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
