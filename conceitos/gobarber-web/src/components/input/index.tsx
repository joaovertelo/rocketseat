import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'

import { Container } from './style'

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
        <Container isFocused={isFocused} isFilled={isFilled} >
            {Icon && <Icon size={20} />}
            <input
                defaultValue={defaultValue}
                {...props}
                ref={inputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
        </Container>
    )
}

export default Input;