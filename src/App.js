/** @jsxImportSource @emotion/react */

import React from 'react'
import { useState } from 'react'
import { Global, css } from '@emotion/react'

function App() {

    const [searchInput, setSearchInput] = useState('');
    const [pokemonInfo, setPokemonInfo] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
      .then(response => response.json())
      .then(data => setPokemonInfo(data))
      .catch(error => console.error(error));
    }
    
    const globalStyles = css `
        body {
              background-color: #3c5aa6;
             }
    `;

    const style = css`
      text-align: center;
      margin: auto;
      padding: auto;
      input {
        margin: 2px 8px;
        height: 15px;
        width: 30%;
        border-radius: 3px;
      }
      button {
        margin: 1px;
        padding: 5px;
      }
      h1 {
        font-size: 64px;
        color: #ffcb05;
      }
      .pokemonCard {
        display: inline-block;
        flex: wrap;
        background-color: #B90000;
        border: 5px solid #ffcb05;
        border-radius: 5px;
        margin: 5px;
        padding: 3px;
        font-size: 20px;
      }
      .pokemonLogo {
        height: 200px;
        width: 200px;
      }
      .title {
        display: flex;
        margin: 3px 10px;
        justify-content: center;

        img {
          border: 4px solid #ffcb05;
        }
      }
      img {
        height: 300px;
        width: 300px;
        border-radius: 5px;
        margin: 3px 10px;
      }
    `;
    return (
      <div css={style}>
        <Global styles={globalStyles} />
        <div className="title"> 
          <h1>pokeDEX Searcher</h1>
          <img 
          className="pokemonLogo"
          src="https://cdn.donmai.us/original/19/11/1911113b6cceb449bdfbb934b4c8cb45.jpg"
          alt="Absol Head Logo" />
          </div>
            <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="Pikachu"
            value={searchInput} 
            onChange={(event) => setSearchInput(event.target.value)} 
            />
            <button type="submit"> Search that Pokemon!</button>
            </form>
          {pokemonInfo && (
          <div className="pokemonCard">
            <h2>{pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1)}</h2>
            <p> Pokedex Number: {pokemonInfo.id}</p>
            <p> Base Experience: {pokemonInfo.id}</p>
            <p> Height: {pokemonInfo.height}</p>
            <h4>Types for {pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1)}:</h4>
            <ul>
              {pokemonInfo.types.map((type, index) => (
              <li key={index}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</li>
            ))}
            
            </ul><img src={pokemonInfo.sprites.front_default} alt={`${pokemonInfo.name} sprite`} />
          </div>
          )}
      </div>
      
    );
}

export default App