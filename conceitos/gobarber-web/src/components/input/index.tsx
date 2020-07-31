import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import { Container, Error } from './style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
    const [isFocused, setisFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputFocus = useCallback(() => {
        setisFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {
        setisFocused(false);

        setIsFilled(!!inputRef.current ?.value);

    }, [])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (
        <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled} >
            {Icon && <Icon size={20} />}
            <input
                defaultValue={defaultValue}
                {...props}
                ref={inputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
            {error &&
                <Error title={error} >

                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            }
        </Container>
    )
}

export default Input;