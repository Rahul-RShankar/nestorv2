import styles from './PhaseStatusBanner.module.css';

interface PhaseStatusBannerProps {
    currentPhase: 1 | 2 | 3;
}

const PhaseStatusBanner = ({ currentPhase }: PhaseStatusBannerProps) => {
    const phases = [
        { id: 1, name: 'Booking', description: 'Now Open' },
        { id: 2, name: 'Development', description: 'Coming Soon' },
        { id: 3, name: 'Allotment', description: 'Final Stage' },
    ];

    return (
        <div className={styles.banner}>
            <div className={`container ${styles.bannerContainer}`}>
                <div className={styles.phaseHeader}>
                    <h2>Project Status</h2>
                    <span className={styles.statusBadge}>Phase {currentPhase} Active</span>
                </div>

                <div className={styles.timeline}>
                    {phases.map((phase) => (
                        <div
                            key={phase.id}
                            className={`${styles.phaseItem} ${currentPhase >= phase.id ? styles.active : ''} ${currentPhase === phase.id ? styles.current : ''}`}
                        >
                            <div className={styles.phaseCircle}>
                                {phase.id}
                                {currentPhase > phase.id && <span className={styles.check}>✓</span>}
                            </div>
                            <div className={styles.phaseInfo}>
                                <span className={styles.phaseName}>{phase.name}</span>
                                <span className={styles.phaseDesc}>
                                    {currentPhase === phase.id ? phase.description : (currentPhase > phase.id ? 'Completed' : 'Pending')}
                                </span>
                            </div>
                            {phase.id < 3 && <div className={styles.connector} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhaseStatusBanner;
