import React, { useRef, useCallback } from 'react'
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'

import logoImg from '../../assets/logo.png'

import { Container, Title, BackToSignIn, BackToSignInText } from './styles'

import Input from '../../components/input'
import Button from '../../components/button'
import { FormHandles } from '@unform/core'

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const handleSignUp = useCallback(
        () => {
            
        },
        [],
    )

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                enabled>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
                    <Container>
                        <Image source={logoImg} />

                        <View>
                            <Title> Crie sua conta</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignUp} style={{width: '100%'}}>

                            <Input name="name" icon="user" placeholder="Nome" />
                            <Input name="email" icon="mail" placeholder="E-Mail" />
                            <Input name="password" icon="lock" placeholder="Senha" />

                            <Button onPress={() => {
                                    if (formRef.current) formRef.current.submitForm();
                                }}> Cadastrar </Button>
                        </Form>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn onPress={() => navigation.goBack()}>
                <Icon name='arrow-left' size={20} color="#fff" />
                <BackToSignInText>Voltar para logon</BackToSignInText>
            </BackToSignIn>
        </>
    )
}

export default SignUp;