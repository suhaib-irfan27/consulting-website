'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
    role: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/me', {
                    method: 'GET',
                    credentials: 'include', // ✅ must be here
                });

                if (!res.ok) {
                    console.warn('❌ /api/me failed', res.status);
                    setUser(null);
                    return;
                }

                const data = await res.json();
                if (data?.user?.role) {
                    setUser(data.user); // ✅ set correctly
                    console.log("👤 Loaded user from /api/me:", data.user);
                } else {
                    console.warn('❌ Invalid user data from /api/me', data);
                    setUser(null);
                }
            } catch (err) {
                console.error('❌ AuthContext fetchUser error:', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};











// 'use client';

// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// interface User {
//     role: string;
//     [key: string]: any;
// }

// interface AuthContextType {
//     user: User | null;
//     loading: boolean;
//     setUser: (user: User | null) => void;
//     logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await fetch('/api/me', {
//                     method: 'GET',
//                     credentials: 'include',
//                 });

//                 if (!res.ok) {
//                     console.warn('❌ /api/me failed', res.status);
//                     setUser(null);
//                     return;
//                 }

//                 const data = await res.json();
//                 if (data?.user?.role) {
//                     setUser(data.user); // ✅ important: set user properly
//                     console.log("👤 Loaded user from /api/me:", data.user);

//                 } else {
//                     console.warn('❌ Invalid user data from /api/me', data);
//                     setUser(null);
//                 }
//             } catch (err) {
//                 console.error('❌ AuthContext fetchUser error:', err);
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, []);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await fetch('/api/me', { credentials: 'include' });
//                 if (!res.ok) throw new Error();
//                 const data = await res.json();
//                 console.log("Loaded user from /api/me:", data); // 👈 Add this
//                 setUser(data.user); // ✅ Must use `data.user`
//             } catch {
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, []);


//     const logout = async () => {
//         await fetch('/api/logout', { method: 'POST' });
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, loading, setUser, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };














// 'use client';

// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// interface User {
//     role: string;
//     [key: string]: any;
// }

// interface AuthContextType {
//     user: User | null;
//     loading: boolean;
//     setUser: (user: User | null) => void;
//     logout: () => Promise<void>; // ✅ Add logout to the interface
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await fetch('/api/me', { credentials: 'include' });
//                 if (!res.ok) throw new Error();
//                 const data = await res.json();
//                 setUser(data.user);
//             } catch {
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, []);

//     const logout = async () => {
//         await fetch('/api/logout', { method: 'POST' });
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, loading, setUser, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };








// 'use client';

// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// interface User {
//     role: string;
//     [key: string]: any;
// }

// interface AuthContextType {
//     user: User | null;
//     loading: boolean;
//     setUser: (user: User | null) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await fetch('/api/me', { credentials: 'include' });
//                 if (!res.ok) throw new Error();
//                 const data = await res.json();
//                 setUser(data.user);
//             } catch {
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, loading, setUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };
