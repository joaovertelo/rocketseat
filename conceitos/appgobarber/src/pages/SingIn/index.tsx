import React from 'react'
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import logoImg from '../../assets/logo.png'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles'

import Input from '../../components/input'
import Button from '../../components/button'

const SignIn: React.FC = () => {
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

                        <Input name="email" icon="mail" placeholder="E-Mail" />
                        <Input name="password" icon="lock" placeholder="Senha" />

                        <Button onPress={() => { }}>Entrar</Button>

                        <ForgotPassword onPress={() => { }}>
                            <ForgotPasswordText >Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={() => { }}>
                <Icon name='log-in' size={20} color="#ff9000" />
                <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}

export default SignIn;