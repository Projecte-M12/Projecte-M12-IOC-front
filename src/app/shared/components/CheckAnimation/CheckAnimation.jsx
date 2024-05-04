/**
 * React
 */
import React from 'react';

/**
 * Estils
 */
import './CheckAnimation.css';

/**
 * Funció principal del component CheckAnimation que mostra una animació de verificació.
 * @returns {JSX.Element} Component de l'animació de verificació.
 */
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