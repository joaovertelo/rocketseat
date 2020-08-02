import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/input'
import Button from '../../components/button'

import { Container, Content, Background, AnimationContainer } from './styles';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
                password: Yup.string().min(4, 'No mínimo 4 dígitos')
            })
            await schema.validate(data, {
                abortEarly: false
            });

            await api.post('/users', data);

            history.push('/')

            addToast({
                type: "success",
                title: 'Cadastro realizado',
                description: 'Agora você já pode fazer logon.'
            })

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                if (formRef.current) { formRef.current.setErrors(errors); }
                return;
            }

            addToast({ type: 'error', title: 'Erro ao cadastrar', description: "Email já existente!" });
        }
    }, [])

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>Faça seu cadastro</h1>
                        <Input name="name" placeholder="Nome" icon={FiUser} />

                        <Input name="email" placeholder="E-mail" icon={FiMail} />

                        <Input name="password" placeholder="Senha" type="password" icon={FiLock} />

                        <Button type="submit"> Cadastrar</Button>

                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para logon
                </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
}

export default SignUp;