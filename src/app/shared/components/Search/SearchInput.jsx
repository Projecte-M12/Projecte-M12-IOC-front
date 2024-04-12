// Llibreris
import React from 'react';
import SearchIcon from '../../../assets/icons/search_icon.svg'

// Estils 
import './SearchInput.css';

// Funció 
export function SearchInput() {
  return (
    <div className="group">
      <SearchIcon className="icon" />
      <input placeholder="Buscar" type="search" className="input" />
    </div>
  );
}

