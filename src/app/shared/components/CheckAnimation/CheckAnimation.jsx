// Llibreries
import React from 'react';

// Estils CSS
import './CheckAnimation.css';


// Función principal del componente Company (página de empresa)
export const CheckAnimation = () => {

  return (
    <div className="success-checkmark">
      <div className="check-icon">
        <span className="icon-line line-esq"></span>
        <span className="icon-line line-drt"></span>
        <div className="icon-cercle"></div>
        <div className="icon-fix"></div>
      </div>
    </div>
  );
  
};