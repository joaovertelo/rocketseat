import React, { createContext, useContext, useCallback } from 'react'
import ToastContainer from '../components/ToastContainer';


interface ToastData {
    addToast(): void;
    removeToast(): void;
}

const Toast = createContext<ToastData>({} as ToastData);

const ToastProvider: React.FC = ({ children }) => {

    const addToast = useCallback(
        () => {

        },
        [],
    )

    const removeToast = useCallback(
        () => {

        },
        [],
    )

    return (
        <Toast.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer />
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