import React, { useState, useEffect } from 'react'
import api from './services/Api'

import './App.css'
import Header from './components/Header'


const App = () =>  {

    const [projects, setProjects] = useState([]);
    

    useEffect(() => {
        api.get('projects').then(res => {
            setProjects(res.data)
        })
    }, [])

    async function handleAdd(){
        const response = await api.post('projects', {title: "oii", owner: "Jao"});
        console.log(response.data)
        setProjects([...projects, response.data]);
        console.log(projects)
    }

    return <>
        <Header title="texto" > 
        
        <ul>
            {projects && projects.map(project => (
                <li key={project.id}>
                    {project.title} - {project.owner}
            </li>))}
        </ul>
        <button type="button" onClick={handleAdd} > Add </button> 
        </Header>
    </>
}

export default App;