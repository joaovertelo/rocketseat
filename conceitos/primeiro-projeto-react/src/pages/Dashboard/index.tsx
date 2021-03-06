import React, { useState, useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles'
import logoImg from '../../assets/logo.svg'


interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('githubexplorer/repositories');
        console.log(storagedRepositories)
        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        }
        return [];
    });


    useEffect(() => {
        localStorage.setItem('githubexplorer/repositories', JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!newRepo) {
            setInputError('Digite o nome do repositório');
            return;
        }

        try {

            const response = await api.get<Repository>(`repos/${newRepo}`)

            const repository = response.data;
            setRepositories([...repositories, repository])
            setNewRepo('');
            setInputError('')
        } catch (err) {
            setInputError('Erro na busca do repositório.')
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title> Explore repositório no Github </Title>

            <Form hasError={!!inputError} addColor="#fff" onSubmit={handleAddRepository} >
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório" />
                <button type="submit"> Pesquisar</button>
            </Form>

            {inputError && <Error> {inputError} </Error>
            }

            <Repositories>
                {repositories.map(repo => (
                    <Link key={repo.full_name} to={`repositories/${repo.full_name}`} >
                        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                        <div>
                            <strong>{repo.full_name} </strong>
                            <p>{repo.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </Link>
                ))}

            </Repositories>
        </>
    )
}

export default Dashboard;