import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'

interface Credentials {
    email: string;
    password: string;
}
interface AuthContextData {
    user: object;
    loading: boolean;
    signIn(credentials: Credentials): Promise<void>;
    signOut(): void;
}

interface AuthState {
    token: string;
    user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true)

    const signIn = useCallback(async ({ email, password }) => {

        const response = await api.post('sessions', {
            email,
            password
        });

        const { token, user } = response.data;

        await AsyncStorage.setItem('@GoBarber:token', token);
        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user })

    }, [])

    useEffect(() => {
        async function loadStorage(): Promise<void> {
            const token = await AsyncStorage.getItem('@GoBarber:token');
            const user = await AsyncStorage.getItem('@GoBarber:user');

            if (token && user) {
                setData({ token, user: JSON.parse(user) })
            }
            setLoading(false)
        }
        loadStorage();
    }, [])

    const signOut = useCallback(async () => {

        await AsyncStorage.removeItem('@GoBarber:token');
        await AsyncStorage.removeItem('@GoBarber:user');

        setData({} as AuthState)

    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth precisa ser usado com um AuthProvider')
    }
    return context;
}

export { useAuth, AuthProvider }