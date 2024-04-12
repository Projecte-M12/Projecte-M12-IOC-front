// Llibreries
import React from 'react';

// Estils CSS
import './CheckAnimation.css';


// Función principal del componente Company (página de empresa)
export const CheckAnimation = () => {

  return (
    <div class="success-checkmark">
      <div class="check-icon">
        <span class="icon-line line-esq"></span>
        <span class="icon-line line-drt"></span>
        <div class="icon-cercle"></div>
        <div class="icon-fix"></div>
      </div>
    </div>
  );
  
};