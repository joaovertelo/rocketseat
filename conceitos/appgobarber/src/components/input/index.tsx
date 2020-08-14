import React, { useEffect, useRef } from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles'

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...props }, ref) => {
    const { registerField, defaultValue = '', fieldName, error} = useField(name);
    const inputValueRef = useRef<InputValueReference>({value: defaultValue});

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value'
        });
    }, [])
    return (
        <Container>
            <Icon name={icon} size={20} color="#666360" />
            <TextInput
                {...props}
                placeholderTextColor="#666360"
                keyboardAppearance="dark"
                defaultValue={defaultValue}
                onChangeText={value => {
                    inputValueRef.current.value = value;
                }}
            />
        </Container>
    )
}

export default Input;