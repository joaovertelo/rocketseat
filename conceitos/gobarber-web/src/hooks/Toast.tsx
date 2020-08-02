import React, { createContext, useContext, useCallback, useState } from 'react'
import ToastContainer from '../components/ToastContainer';
import { uuid } from 'uuidv4';

interface ToastData {
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

export interface ToastMessage {
    id: string;
    type?: 'success' | 'info' | 'error';
    title: string;
    description?: string;
}

const Toast = createContext<ToastData>({} as ToastData);

const ToastProvider: React.FC = ({ children }) => {

    const [messages, setMessages] = useState<ToastMessage[]>([])

    const addToast = useCallback(
        ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
            const id = uuid();

            const toast = {
                id,
                type,
                title,
                description
            }

            setMessages(state => [...state, toast])

            setTimeout(() => {
                setMessages(state => state.filter(message => message.id !== toast.id))
            }, 3000)
        },
        [],
    )

    const removeToast = useCallback(
        (id: string) => {
            setMessages(state => state.filter(message => message.id !== id));
        },
        [],
    )

    return (
        <Toast.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </Toast.Provider>
    )
}

function useToast() {
    const context = useContext(Toast);

    if (!context) {
        throw new Error('useToast precisa ser usando com um ToastPovider')
    }

    return context;
}

export { ToastProvider, useToast }