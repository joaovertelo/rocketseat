import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

import { Title, Form, Repositories } from './styles'
import logoImg from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title> Explore repositório no Github </Title>

            <Form >
                <input placeholder="Digite o nome do repositório" />
                <button type="submit"> Pesquisar</button>
            </Form>

            <Repositories>
                <a href="teste" >
                    <img src="https://avatars0.githubusercontent.com/u/32840939?s=460&u=555bd5c047af5b8182624d6580296de0a5a201b4&v=4" alt="Joao" />
                    <div>
                        <strong>Joao </strong>
                        <p>Descrição qualquer aqui!!!</p>
                    </div>
                    <FiChevronRight size={20} />
                </a>

                <a href="teste" >
                    <img src="https://avatars0.githubusercontent.com/u/32840939?s=460&u=555bd5c047af5b8182624d6580296de0a5a201b4&v=4" alt="Joao" />
                    <div>
                        <strong>Joao </strong>
                        <p>Descrição qualquer aqui!!!</p>
                    </div>
                    <FiChevronRight size={20} />
                </a>

                <a href="teste" >
                    <img src="https://avatars0.githubusercontent.com/u/32840939?s=460&u=555bd5c047af5b8182624d6580296de0a5a201b4&v=4" alt="Joao" />
                    <div>
                        <strong>Joao </strong>
                        <p>Descrição qualquer aqui!!!</p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
            </Repositories>
        </>
    )
}

export default Dashboard;