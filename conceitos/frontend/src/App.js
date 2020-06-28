import React, { useState } from 'react'

import './App.css'
import backgroundImage from './assets/background.jpeg'

import Header from './components/Header'


const App = () =>  {

    const [texto, setTexto] = useState('meu texto');


    const handleAdd = () => {
        setTexto(texto + "novoTexto");
    }

    return <>
        <Header title="texto" > 
        
        <div> {texto}</div>
        <img width={500} height={500} src={backgroundImage} />
        <button type="button" onClick={handleAdd} > Add </button> 
        </Header>
    </>
}

export default App;