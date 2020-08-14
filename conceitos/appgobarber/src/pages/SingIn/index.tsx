import React, { useCallback, useRef } from 'react'
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import logoImg from '../../assets/logo.png'

import { useAuth } from '../../hooks/AuthContext'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'

import Input from '../../components/input'
import Button from '../../components/button'

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {

            await signIn({
                email: data.email,
                password: data.password
            });
        } catch (err) {

        }
    }, [signIn])

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

                        <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>

                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-Mail"
                                returnKeyType="next" />
                            <Input
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    if (formRef.current) formRef.current.submitForm();
                                }} />

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