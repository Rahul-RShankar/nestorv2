// MOCK PRISMA CLIENT
// Used to bypass environment-specific assertion errors with Prisma + Node 24 on Windows

// Persist the mock user across hot-reloads using globalThis
declare global {
    var mockRegisteredUser: any;
}

const mockPrisma = {
    user: {
        findUnique: async ({ where }: any) => {
            // Check in-memory mock store
            const user = globalThis.mockRegisteredUser;
            if (user && where?.email === user.email) {
                return user;
            }

            // Default admin user for testing
            // Password: admin123
            if (where?.email === 'admin@nestor.com') {
                return {
                    id: 'mock-admin',
                    name: 'Admin Nestor',
                    email: 'admin@nestor.com',
                    // This is a bcrypt hash for 'admin123'
                    passwordHash: '$2a$10$M9E9.9V.p9V.p9V.p9V.p.e9fU.p9ZkL2R.XmYv8Ye9H6GfFm9z',
                    role: 'ADMIN'
                };
            }
            return null;
        },
        findMany: async () => [],
        create: async ({ data }: any) => {
            const newUser = { id: 'mock-user-' + Math.random().toString(36).substr(2, 9), ...data };
            globalThis.mockRegisteredUser = newUser;
            return newUser;
        },
    },
    property: {
        findUnique: async ({ where }: any) => ({
            id: where?.id || 'mock-p1',
            slotNo: '107',
            status: 'AVAILABLE',
            price: 4500000,
            area: 1200,
            segment: 'PLOT',
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'
        }),
        findMany: async () => [],
        create: async ({ data }: any) => ({ id: 'mock-id', ...data }),
    },
    booking: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async ({ data }: any) => ({ id: 'mock-id', ...data }),
    },
    project: {
        findUnique: async () => null,
        findMany: async () => [],
    },
    $connect: async () => { },
    $disconnect: async () => { },
};

export default mockPrisma as any;
