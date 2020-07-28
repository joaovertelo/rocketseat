import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/input'
import Button from '../../components/button'

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {

    function handleSubmit(data: object) {

        console.log(data);
    }

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form onSubmit={handleSubmit} >
                    <h1>Faça seu cadastro</h1>
                    <Input name="name" placeholder="Nome" icon={FiUser} />

                    <Input name="email" placeholder="E-mail" icon={FiMail} />

                    <Input name="password" placeholder="Senha" type="password" icon={FiLock} />

                    <Button type="submit"> Cadastrar</Button>

                </Form>

                <a href="df">
                    <FiArrowLeft />
                    Voltar para logon
            </a>
            </Content>
        </Container>
    )
}

export default SignUp;