import React from 'react'
import { FiAlertCircle, FiXCircle, FiInfo, FiCheckCircle } from 'react-icons/fi'

import { Container, Toast } from './styles'
import { ToastMessage, useToast } from '../../hooks/Toast'

const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />
}


interface ToastContainerProps {
    messages: ToastMessage[]
}
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const { removeToast } = useToast();
    return (
        <Container>
            {messages.map(message => (
                <Toast key={message.id}
                    type={message.type}
                    hasDescription={!!message.description}
                >
                    {icons[message.type || 'info']}

                    <div>
                        <strong>{message.title}</strong>
                        {message.description &&
                            <p>{message.description}</p>
                        }
                    </div>

                    <button type="button" onClick={() => removeToast(message.id)}>
                        <FiXCircle size={18} />
                    </button>
                </Toast>
            ))}
        </Container>
    )
}

export default ToastContainer;