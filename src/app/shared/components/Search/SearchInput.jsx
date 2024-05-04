/**
 * React
 */
import React, { useState } from 'react';

/**
 * Estils
 */
import './SearchInput.css';

/**
 * Icones
 */
import SearchIcon from '../../../assets/icons/search_icon.svg'

/**
 * Component de cerca que permet als usuaris introduir un terme de cerca i enviar-lo per obtenir resultats.
 * @returns {JSX.Element} Component de cerca.
 */
export const SearchInput = () => {
  // estat que guarda l'input
  const [query, setQuery] = useState('');
  // estat que guarda el resultat de la cerca
  const [results, setResults] = useState([]);

  // fa una crida a la API amb "query" i actualitza "results"
  // TODO fer la funció correctament
  const handleSearch = async () => {
    try {
      const response = await fetch(`API_URL?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // actualitza "query" 
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // executa quan s'envia la consulta
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="group">
      <div className="group">
        <SearchIcon className="icon" />
        <input
          placeholder="Search"
          type="search"
          className="input"
          value={query}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="search-button">
        Busca
      </button>
    </form>
  );
};