import React, { useCallback, useRef } from 'react'
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import logoImg from '../../assets/logo.png'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'

import Input from '../../components/input'
import Button from '../../components/button'

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const handleSignIn = useCallback(
        (data: object) => {
            console.log(data);
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
                            <Title> Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn} style={{width: '100%'}}>

                            <Input name="email" icon="mail" placeholder="E-Mail" />
                            <Input name="password" icon="lock" placeholder="Senha" />

                            <Button
                                onPress={() => {
                                    if (formRef.current) formRef.current.submitForm();
                                }}>
                                Entrar
                                </Button>
                        </Form>

                        <ForgotPassword onPress={() => { }}>
                            <ForgotPasswordText >Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                <Icon name='log-in' size={20} color="#ff9000" />
                <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}

export default SignIn;