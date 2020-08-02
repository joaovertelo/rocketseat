import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg'

import Input from '../../components/input'
import Button from '../../components/button'

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/Toast';

import { Container, Content, Background } from './styles';

interface SignInFormData {
    email: string;
    password: string;
}
const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            if (formRef.current) {
                formRef.current.setErrors({});
            }

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
                password: Yup.string().min(4, 'Senha obrigatória')
            })
            await schema.validate(data, {
                abortEarly: false
            });

            await signIn({ email: data.email, password: data.password });
        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                if (formRef.current) { formRef.current.setErrors(errors); }
            }

            addToast();

        }
    }, [signIn, addToast])

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form onSubmit={handleSubmit} ref={formRef}>
                    <h1>Faça seu logon</h1>
                    <Input name="email" placeholder="E-mail" icon={FiMail} />

                    <Input name="password" placeholder="Senha" type="password" icon={FiLock} />

                    <Button type="submit"> Entrar</Button>

                    <a href="forgot" >Esqueci minha senha</a>
                </Form>

                <a href="df">
                    <FiLogIn />
                    Criar conta
            </a>
            </Content>

            <Background />
        </Container>
    )
}

export default SignIn;